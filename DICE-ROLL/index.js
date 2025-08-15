function rollDice() {
    const numOfDice = document.getElementById("numOfDice").value;
    const diceResults = document.getElementById("diceResult"); // fixed id
    const diceImages = document.getElementById("diceImages");
    const values = [];
    const images = [];

    for (let i = 0; i < numOfDice; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="diceimages/${value}.png" alt="Dice ${value}" style="height:50px;">`); // removed space
    }

    diceResults.textContent = `Dice: ${values.join(', ')}`;
    diceImages.innerHTML = images.join(' ');
}
