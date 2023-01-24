class Pokemon {
  constructor(name, type, skills, hp, status) {
    this.name = name;
    this.type = type;
    this.skills = skills;
    this.hp = hp;
    this.status = status;
  }
  attack(pokemon) {
    if (this.hp > 0) {
      console.log(this.name, "atacando a:", pokemon.name);
      let skill = this.skills[0];
      let power = skill.verifyElement(pokemon.type, skill.power);
      pokemon.reduceHP(power);
    } else {
      console.log(this.name, "no puede atacar,salud:", this.hp);
    }
  }

  isAlive() {}

  reduceHP(power) {
    this.hp = this.hp - power;
  }
}

class Battle {
  constructor(team1, team2) {
    this.team1 = team1; //array
    this.team2 = team2; //array
  }
  fight() {
    console.log("Battle Begins...");

    let indexTeam1 = 0;
    let indexTeam2 = 0;

    while (indexTeam1 < this.team1.length && indexTeam2 < this.team2.length) {
      let pokemon1 = this.team1[indexTeam1];
      let pokemon2 = this.team2[indexTeam2];

      let survivor = this.atacarHastaDerrotar(pokemon1, pokemon2);
      if (survivor === pokemon1) {
        indexTeam2++;
      } else {
        indexTeam1++;
      }
    }
    if (indexTeam1 > indexTeam2) {
      console.log("Gano el equipo 2");
    } else {
      console.log("Gano el equpo1");
    }
    console.log("Equipo 1:", this.team1);
    console.log("Equipo 2:", this.team2);
  }
  atacarHastaDerrotar(pokemon1, pokemon2) {
    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      pokemon1.attack(pokemon2);
      pokemon2.attack(pokemon1);
    }
    if (pokemon1.hp > 0) {
      console.log("Survivor:", pokemon1.name);
      return pokemon1;
    } else {
      console.log("Survivor", pokemon2.name);
      return pokemon2;
    }
  }
}

class Element {
  calculatePower(enemyElement, attack, strongAgainst, weakAgainst) {
    if (enemyElement === weakAgainst) {
      console.log("El ataque fue debil");
      return attack - 10;
    } else if (enemyElement === strongAgainst) {
      console.log("El ataque fue fuerte");
      return attack + 10;
    } else {
      console.log("El ataque fue normal");
      return attack;
    }
  }
}

class Water extends Element {
  strongAgainst = "Fire";
  weakAgainst = "Plant";
  verifyElement(enemyElement, attack) {
    return super.calculatePower(
      enemyElement,
      attack,
      this.strongAgainst,
      this.weakAgainst
    );
  }
}

class Fire extends Element {
  strongAgainst = "Plant";
  weakAgainst = "Water";
  verifyElement(enemyElement, attack) {
    return super.calculatePower(
      enemyElement,
      attack,
      this.strongAgainst,
      this.weakAgainst
    );
  }
}

class Plant extends Element {
  strongAgainst = "Water";
  weakAgainst = "Fire";
  verifyElement(enemyElement, attack) {
    return super.calculatePower(
      enemyElement,
      attack,
      this.strongAgainst,
      this.weakAgainst
    );
  }
}

class Cascada extends Water {
  power = 102;
}
class HidroBomba extends Water {
  power = 98;
}

class Lanzallamas extends Fire {
  power = 105;
}

class HojaAfilada extends Plant {
  power = 100;
}

const charmander1 = new Pokemon(
  "Charmander1",
  "Fire",
  [new Lanzallamas()],
  1000,
  true
);
const charmander2 = new Pokemon(
  "Charmander2",
  "Fire",
  [new Lanzallamas()],
  1000,
  true
);

const squirtle1 = new Pokemon(
  "Squirtle1",
  "Water",
  [new HidroBomba()],
  900,
  true
);
const squirtle2 = new Pokemon("Squirtle2", "Water", [new Cascada()], 900, true);

const bulbasaur1 = new Pokemon(
  "bulbasaur1",
  "Plant",
  [new HojaAfilada()],
  1100,
  true
);
const bulbasaur2 = new Pokemon(
  "bulbasaur2",
  "Plant",
  [new HojaAfilada()],
  1100,
  true
);

const team1 = [charmander1, squirtle1, bulbasaur1];
const team2 = [squirtle2, bulbasaur2, charmander2];

const battle = new Battle(team1, team2);
battle.fight();
