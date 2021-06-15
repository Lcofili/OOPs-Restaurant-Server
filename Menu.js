const express = require("express")
const port = 6000

const Menu = [
{id :1, meal: "Fufu and Egusi Soup"},
{id :2, meal: "Fried-Rice and Chicken"},
{id :3, meal: "Beans and Plantain"},
{id :4, meal: "Pounded-Yam and Vegetable Soup"},
{id :5, meal: "Yam Porridge and Fried Fish"},
{id :6, meal: "Moi-Moi and Pap"},
{id :7, meal: "Ofe Nsala and Semovita"},
{id :8, meal: "Jollof Rice and Fish Sauce"},
];

const app = express();
app.use(express.json()); 

app.get("/", (req, res) =>{
    res.send("Welcome To OOPs Restaurant");
});

// All Available Meal On The Menu
app.get("/api/Menu", (req, res) =>{
    res.send(Menu); 
});

// Get A Single Meal From The Menu
app.get("/api/Menu/:id", (req, res) =>{
    const meal = Menu.find((food) => food.id ===parseInt(req.params.id))
    if (!meal) {
        res.status(404).send(`Meal not found in the Menu: ${req.params.id}`);
    } else {
    res.send(meal)}
});

// Create A New Meal In The Menu
app.post("/api/Menu", (req, res) =>{
    if (!req.body.meal){
        res.send("please add")
    } else {
        const newRecipe = {
            id: Menu.length + 1,
            meal: req.body.meal
        }
        Menu.push(newRecipe)
        res.send(Menu)}
});

// Update The Menu
app.put("/api/Menu/:id", (req, res) =>{
    const meal = Menu.find((food) =>food.id ===parseInt(req.params.id))
    if (meal) {
            res.status(404).send(`Meal not found in the Menu: ${req.params.id}`) 
            if (!req.body.meal) {
                res.send("please add")}
            else {
            meal.meal = req.body.meal
            res.send(Menu)}
    }
});

// Delete A Meal From The Menu
app.delete("/api/Menu/:id", (req, res) =>{
    const meal = Menu.find((food) => food.id ===parseInt(req.params.id))
    if (!meal) {
        res.status(404).send(`Meal not found in the Menu: ${req.params.id}`);
    } else {
    res.send(meal)}
    Menu.splice(meal,3)
    res.send(Menu)
});
app.listen(port, () => {
console.log(`server is listening on port: $(port)`)
});

