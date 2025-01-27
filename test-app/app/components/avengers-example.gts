import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { AriaTabs } from 'ember-aria-tabs';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import style from 'ember-style-modifier';

type Character = {
  checked: boolean;
  name: string;
  img: string;
  color: string;
  text: string;
  desc: string;
};

interface AvengersExampleSignature {
  Element: HTMLDivElement;
}

export default class AvengersExample extends Component<AvengersExampleSignature> {
  @tracked characters: Character[] = [
    {
      checked: true,
      name: 'Ant-Man',
      img: '../ant_man.png',
      color: 'IndianRed',
      text: 'white',
      desc: '"I do some dumb things, and the people I love the most...they pay the price."',
    },
    {
      checked: true,
      name: 'Black Widow',
      img: '../black_widow.png',
      color: 'SlateGrey',
      text: 'white',
      desc: '"After everything that happened with S.H.I.E.L.D., during my little hiatus, I went back to Russia and tried to find my parents. Two little graves linked by a chain fence. I pulled some weeds and left some flowers. We have what we have when we have it."',
    },
    {
      checked: true,
      name: 'Captain America',
      img: '../captain_america.png',
      color: 'RoyalBlue',
      text: 'white',
      desc: "\"I'm not looking for forgiveness. And I'm way past asking for permission. Earth just lost their best defender. So we're here to fight. If you wanna stay in our way... we'll fight you, too.\"",
    },
    {
      checked: false,
      name: 'Director Fury',
      img: '../fury.png',
      color: 'Sienna',
      text: 'white',
      desc: '"Back in the day, I had eyes everywhere, ears everywhere else. Here we all are, back on earth, with nothing but our wit, and our will to save the world. So stand. Outwit the platinum bastard."',
    },
    {
      checked: true,
      name: 'Hawkeye',
      img: '../hawkeye.png',
      color: 'MediumOrchid',
      text: 'white',
      desc: '"Just can\'t seem to miss."',
    },
    {
      checked: true,
      name: 'Iron Man',
      img: '../ironman.png',
      color: 'LightCoral',
      text: 'black',
      desc: '"My armor was never a distraction or a hobby. It was a cocoon. And now I\'m a changed man. You can take away my house, all my tricks and toys. But one thing you can\'t take away... I am Iron Man."',
    },
    {
      checked: false,
      name: 'Loki',
      img: '../loki.png',
      color: 'LightGreen',
      text: 'black',
      desc: '"I, Loki, Prince of Asgard, Odinson, the rightful King of Jotunheim, God of Mischief, do hereby pledge to you, my undying fidelity."',
    },
    {
      checked: true,
      name: 'Thor',
      img: '../thor.png',
      color: 'SkyBlue',
      text: 'black',
      desc: '"You know I’m 1500 years old. I’ve killed twice as many enemies as that. And every one of them would have rather killed me than not succeeded. I’m only alive because fate wants me alive. Thanos is just the latest of a long line of bastards, and he’ll be the latest to feel my vengeance. Fate wills it so."',
    },
    {
      checked: true,
      name: 'War Machine',
      img: '../war_machine.png',
      color: 'LightGrey',
      text: 'black',
      desc: "\"138 combat missions. That's how many I've flown, Tony. Every one of them could've been my last, but I flew 'em. Because the fight needed to be fought.\"",
    },
  ];

  get checkedCharacters() {
    return this.characters.filter((char) => char.checked);
  }

  toggleCharacter = (char: Character, index: number) => {
    this.characters = [
      ...this.characters.slice(0, index),
      {
        ...char,
        checked: !char.checked,
      },
      ...this.characters.slice(index + 1),
    ];
  };

  <template>
    <p>
      {{#each this.characters as |char index|}}
        <label key={{char.name}}>
          <input
            type="checkbox"
            name={{char.name}}
            checked={{char.checked}}
            {{on "click" (fn this.toggleCharacter char index)}}
          />
          {{char.name}}&nbsp;
        </label>
      {{/each}}
    </p>

    <AriaTabs
      @selectedTabClassName="avengers-tab--selected"
      @selectedTabPanelClassName="avengers-tab-panel--selected"
      as |at|
    >
      <at.tabList class="avengers-tab-list" as |tl|>
        {{#each this.characters as |char|}}
          {{#if char.checked}}
            <tl.tab {{style background-color=char.color}} class="avengers-tab">
              <img src={{char.img}} alt={{char.name}} height="32" width="32" />
            </tl.tab>
          {{/if}}
        {{/each}}
      </at.tabList>

      {{#each this.checkedCharacters as |char|}}
        <at.tabPanel
          {{style background-color=char.color color=char.text}}
          class="avengers-tab-panel"
        >
          {{char.desc}}
        </at.tabPanel>
      {{/each}}
    </AriaTabs>
  </template>
}
