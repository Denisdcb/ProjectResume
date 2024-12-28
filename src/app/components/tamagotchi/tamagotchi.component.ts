import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

class Tamagochi {
    name: string;
    age: number;
    life: number;
    energy: number;

    constructor(name: string) {
        this.name = name;
        this.age = 0;
        this.life = 100;
        this.energy = 100;
    }

    getStatus(): string {
        return `Nom: ${this.name}, Âge: ${this.age}, Vie: ${this.life}, Énergie: ${this.energy}`;
    }
}

interface Logo {
    screen: string;
    normal: string;
    angry: string;
    dead: string;
}

const logo: Logo = {
    screen: "\u{270B}",
    normal: "\u{1F638}",
    angry: "\u{1F63C}",
    dead: "\u{1F691}"
};

@Component({
    selector: 'app-tamagotchi',
    standalone: true,
    templateUrl: './tamagotchi.component.html',
    styleUrls: ['./tamagotchi.component.css'],
    imports: [ReactiveFormsModule]
})
export class TamagotchiComponent implements OnInit {

    myForm: FormGroup = new FormGroup({
        name: new FormControl('')
    });

    onSubmit(): void {
        this.startTam(this.myForm.value.name);
    }

    constructor() {}

    ngOnInit(): void {}

    startTam(name: string): void {

        const form = document.getElementById('tam-form') as HTMLFormElement;
        const tamagotchi = new Tamagochi(name);
        const screenLogo = document.getElementById('screen-logo') as HTMLElement;
        const screenMessage = document.getElementById('screen-message') as HTMLElement;
        const displayTam = document.getElementById('tam-infos') as HTMLElement;
        const restart = document.getElementById('restart') as HTMLElement;
        const tamagotchiChooseName = document.getElementById('name') as HTMLInputElement;
        const foodTam = document.getElementById('food') as HTMLElement;
        const sleepTam = document.getElementById('sleep') as HTMLElement;
        const tamagotchiName = document.getElementById('tam-name') as HTMLElement;
        const tamagotchiAge = document.getElementById('tam-age') as HTMLElement;
        const tamagotchiLife = document.getElementById('tam-life') as HTMLElement;
        const tamagotchiEnergy = document.getElementById('tam-energy') as HTMLElement;
        const tamagotchiCurrentLife = document.getElementById('tam-life-current') as HTMLElement;
        const tamagotchiCurrentEnergy = document.getElementById('tam-energy-current') as HTMLElement;


        form.style.display = 'none';
        if (displayTam) displayTam.style.display = 'flex';

        function clamp(value: number, min: number, max: number): number {
            return Math.max(min, Math.min(value, max));
        }


        if (screenLogo) {
            screenLogo.textContent = logo.normal;
        }
        if (tamagotchiName) {
            tamagotchiName.textContent = `Name : ${tamagotchi.name}`;
        }
        if (displayTam) displayTam.style.display = 'flex';

        function updateUI(): void {
            if (tamagotchiLife) {
                tamagotchiLife.textContent = `Life : ${tamagotchi.life}`;
                if (tamagotchiCurrentLife) {
                    tamagotchiCurrentLife.style.width = `${tamagotchi.life}%`;
                }
            }

            if (tamagotchiEnergy) {
                tamagotchiEnergy.textContent = `Energy : ${tamagotchi.energy}`;
                if (tamagotchiCurrentEnergy) {
                    tamagotchiCurrentEnergy.style.width = `${tamagotchi.energy}%`;
                }
            }

            if (tamagotchiAge) {
                tamagotchiAge.textContent = `Age : ${tamagotchi.age}`;
            }

            if ((tamagotchi.life === 0 || tamagotchi.energy === 0) && screenLogo) {
                clearInterval(intervalId); // Arrêter l'intervalle
                screenLogo.textContent = logo.dead; // Logo "mort"
                if (screenMessage) {
                    screenMessage.style.color = "red";
                    screenMessage.textContent = "GAME OVERRR";
                }
                if (displayTam) displayTam.style.display = "none";
                if (restart) restart.style.display = "flex";
            }
        }

        function growUp(): void {
            tamagotchi.life = clamp(tamagotchi.life - 5, 0, 100);
            tamagotchi.energy = clamp(tamagotchi.energy - 5, 0, 100);
            tamagotchi.age += 1;

            if (screenLogo) {
                if (tamagotchi.life < 50 || tamagotchi.energy < 50) {
                    if (tamagotchi.life > 0 && tamagotchi.energy > 0) {
                        screenLogo.textContent = logo.angry;
                        if (screenMessage) {
                            screenMessage.style.color = "orange";
                            screenMessage.textContent = "HELPPPPP";
                        }
                    }
                } else {
                    if (tamagotchi.life > 0 && tamagotchi.energy > 0) {
                        screenLogo.textContent = logo.normal;
                        if (screenMessage) {
                            screenMessage.style.color = "green";
                            screenMessage.textContent = "EVR'S FINE";
                        }
                    }
                }
            }

            updateUI();

            if (tamagotchi.life === 0 || tamagotchi.energy === 0) {
                clearInterval(intervalId); // Arrêter l'intervalle
            }
        }

        const intervalId = setInterval(growUp.bind(this), 2000); // Adjust this if necessary

        foodTam?.addEventListener('click', () => {
            if (tamagotchi) {
                tamagotchi.life = clamp(tamagotchi.life + 10, 0, 100); // Assurer que life ne dépasse pas 100
                tamagotchi.energy = clamp(tamagotchi.energy - 10, 0, 100); // Assurer que energy ne descende pas sous 0
                updateUI(); // Mettre à jour l'UI après les changements
            }
        });

        sleepTam?.addEventListener('click', () => {
            if (tamagotchi) {
                tamagotchi.energy = clamp(tamagotchi.energy + 50, 0, 100); // Assurer que energy ne dépasse pas 100
                updateUI(); // Mettre à jour l'UI après les changements
            }
        });

    }

    restartGame(): void {
        const restartButton = document.getElementById('restart') as HTMLElement;
        restartButton.style.display = 'none';
        this.startTam('Tamagotchi');
    }
}
