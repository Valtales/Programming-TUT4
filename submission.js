// Names are strings; catName may be null. Skills are three integers or numeric strings.
// Leaving out initialSkills starts all three skills at zero.
function createCharacter(charName, catName = null, initialSkills = [0, 0, 0]) {
    // Only numeric skill fields can increase, and they stop at level 10.
    function levelUp(skill) {
        if (typeof this[skill] === "number" && this[skill] < 10) {
            this[skill] += 1;
        }
    }

    // Accepts any number of item strings, keeping their order and duplicates.
    function grabItems(...items) {
        this.inventory.push(...items);
    }

    // Accepts one item string and removes only its first match.
    function dropItem(item) {
        let itemIndex = this.inventory.indexOf(item);
        // A missing item gives -1, so leave the inventory alone in that case.
        if (itemIndex !== -1) {
            this.inventory.splice(itemIndex, 1);
        }
    }

    // Convert skill strings to numbers and keep each starting skill within 0 to 10.
    let character = {
        characterName: charName,
        fishingSkill: Math.max(0, Math.min(10, Number(initialSkills[0]))),
        miningSkill: Math.max(0, Math.min(10, Number(initialSkills[1]))),
        farmingSkill: Math.max(0, Math.min(10, Number(initialSkills[2]))),
        inventory: [],
        levelUp,
        grabItems,
        dropItem
    };

    // An empty cat name still counts as a name; only null leaves the property out.
    if (catName !== null) {
        character.catName = catName;
    }

    return character;
}

// Accepts a character object and prints and returns its description.
function describeCharacter(character) {
    let total = character.fishingSkill + character.miningSkill + character.farmingSkill;
    let description = character.characterName;

    if (total < 10) {
        description += " is just starting out";
    } else {
        description += " is a skilled adventurer";
    }

    // Check for the property so an empty cat name is included too.
    if ("catName" in character) {
        description += ` and has a cat ${character.catName}`;
    }

    description += ".";
    console.log(description);
    return description;
}
