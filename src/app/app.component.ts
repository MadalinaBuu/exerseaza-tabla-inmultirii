import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'exerseaza-tabla-inmultirii';
  valueChosen: number = 0;
  valueSelected: string = '';
  myList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  newList: any[] = [];
  result: number = 0;
  value: number = 0;
  firstMistake: number = 0;

  numberChosen: boolean = false;
  success: boolean = false;
  error: boolean = false;

  successMsg: string = "";

  disableButton: boolean = false;

  ngOnInit() {
  }

  checkNumber(valueSelected: number) {
    this.disableButton = true;
    if (this.value * valueSelected == this.result) {
      this.success = true;
      this.successMsg = "Ai reusit! Continui?";
      this.valueSelected = valueSelected.toString();
    }
    else this.error = true;
  }

  setNumber(valueChosen: number) {
    this.numberChosen = true;
    this.valueChosen = valueChosen;
    this.value = this.valueChosen;
    this.updateList();
    this.result = this.getRandomNumberFromList(this.newList);
  }

  getRandomNumberFromList(list: any[]) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  updateList() {
    this.newList = this.myList.map((value) => value * this.value);
  }

  nextTry() {
    this.newList = this.newList.filter(r => r != this.result);
    console.log(this.newList);

    if (this.newList.length > 0) {
      this.valueSelected = "";
      this.success = false;
      this.disableButton = false;
      this.result = this.getRandomNumberFromList(this.newList);
    }
    else {
      this.success = true;
      this.successMsg = "WOW! Ai finalizat cu succes exercitiile cu cifra " + this.value + "!";
    }
  }

  reTry() {
    this.disableButton = false;
    this.error = false;
    this.firstMistake += 1;

    if (this.firstMistake == 3) {
      this.numberChosen = false;
      this.firstMistake = 0;
    }
  }

  resetValues(){
    this.numberChosen = false;
    this.success = false;
    this.error = false;
    this.valueSelected = "";
    this.disableButton = false;
  }

}

