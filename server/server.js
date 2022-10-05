const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();
const cors = require("cors")
app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5501",
    })
  )

// app.use(express.static('public'));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


const storeItems = new Map([
    [111, { priceInCents: 1000, name: 'Closed Door'}],
    [112, { priceInCents: 2000, name: 'Open Door'}],
    [113, { priceInCents: 3000, name: 'Window'}],
    [114, { priceInCents: 4000, name: 'Chair'}],
    [115, { priceInCents: 5000, name: 'Red Chair'}],
    [116, { priceInCents: 6000, name: 'Blue Chair'}],
    [117, { priceInCents: 7000, name: 'Dresser - Dark Wood'}],
    [118, { priceInCents: 8000, name: 'Dresser - White'}],
    [119, { priceInCents: 9000, name: 'Bedside table - Shale'}],
    [120, { priceInCents: 10000, name: 'Bedside table - White'}],
    [121, { priceInCents: 1000, name: 'Wardrobe - White'}],
    [122, { priceInCents: 2000, name: 'Full Bed'}],
    [123, { priceInCents: 3000, name: 'Bookshelf'}],
    [124, { priceInCents: 4000, name: 'Media Console - White'}],
    [125, { priceInCents: 5000, name: 'Media Console - Black'}],
    [126, { priceInCents: 6000, name: 'Sectional - Olive'}],
    [127, { priceInCents: 6000, name: 'Sofa - Grey'}],
    [128, { priceInCents: 7000, name: 'Wooden Trunk'}],
    [129, { priceInCents: 8000, name: 'Floor Lamp'}],
    [130, { priceInCents: 9000, name: 'Coffee Table - Wood'}],
    [131, { priceInCents: 10000, name: 'Side Table'}],
    [132, { priceInCents: 1000, name: 'Dining Table'}],
    [133, { priceInCents: 2000, name: 'Dining table'}],
    [134, { priceInCents: 3000, name: 'Blue Rug'}],
    [135, { priceInCents: 4000, name: 'NYC Poster'}],



])

app.post('/create-checkout-session', async (req, res) => {
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map( item => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        });
        res.json({ url: session.url});
    } catch (e) {
       res.status(500).json({error: e.message}); 
    }
});

app.listen(3000);
console.log('3000 port');


