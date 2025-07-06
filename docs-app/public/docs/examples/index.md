<!-- markdownlint-disable no-inline-html -->

# Examples

## Super Mario Example

```gjs live no-shadow
import { AriaTabs } from 'ember-aria-tabs';

<template>
  <AriaTabs as |at|>
    <at.tabList as |tl|>
      <tl.tab>Mario</tl.tab>
      <tl.tab @disabled={{true}}>Luigi</tl.tab>
      <tl.tab>Peach</tl.tab>
      <tl.tab>Yoshi</tl.tab>
      <tl.tab>Toad</tl.tab>
    </at.tabList>
    <at.tabPanel>
      <p>
        <b>Mario</b>
        (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (<i>English:
          /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional character in the
        Mario video game franchise, owned by Nintendo and created by Japanese
        video game designer Shigeru Miyamoto. Serving as the company's mascot
        and the eponymous protagonist of the series, Mario has appeared in over
        200 video games since his creation. Depicted as a short, pudgy, Italian
        plumber who resides in the Mushroom Kingdom, his adventures generally
        center upon rescuing Princess Peach from the Koopa villain Bowser. His
        younger brother and sidekick is Luigi.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Mario'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Luigi</b>
        (<i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (<i>English:
          /luˈiːdʒi/; Italian: [luˈiːdʒi]</i>) is a fictional character featured
        in video games and related media released by Nintendo. Created by
        prominent game designer Shigeru Miyamoto, Luigi is portrayed as the
        slightly younger but taller fraternal twin brother of Nintendo's mascot
        Mario, and appears in many games throughout the Mario franchise, often
        as a sidekick to his brother.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Luigi'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Princess Peach</b>
        (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>) is a
        character in Nintendo's Mario franchise. Originally created by Shigeru
        Miyamoto, Peach is the princess of the fictional Mushroom Kingdom, which
        is constantly under attack by Bowser. She often plays the damsel in
        distress role within the series and is the lead female. She is often
        portrayed as Mario's love interest and has appeared in Super Princess
        Peach, where she is the main playable character.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Princess_Peach'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Yoshi</b>
        (<i>ヨッシー Yosshī, [joɕ.ɕiː]</i>) (<i>English: /ˈjoʊʃi/ or /ˈjɒʃi/</i>),
        once romanized as Yossy, is a fictional anthropomorphic dinosaur who
        appears in video games published by Nintendo. Yoshi debuted in Super
        Mario World (1990) on the Super Nintendo Entertainment System as Mario
        and Luigi's sidekick. Yoshi later starred in platform and puzzle games,
        including Super Mario World 2: Yoshi's Island, Yoshi's Story and Yoshi's
        Woolly World. Yoshi also appears in many of the Mario spin-off games,
        including Mario Party and Mario Kart, various Mario sports games, and
        Nintendo's crossover fighting game series Super Smash Bros. Yoshi
        belongs to the species of the same name, which is characterized by their
        variety of colors.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Yoshi'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Toad</b>
        (<i>Japanese: キノピオ Hepburn: Kinopio</i>) is a fictional character
        who primarily appears in Nintendo's Mario franchise. Created by Japanese
        video game designer Shigeru Miyamoto, he is portrayed as a citizen of
        the Mushroom Kingdom and is one of Princess Peach's most loyal
        attendants; constantly working on her behalf. He is usually seen as a
        non-player character (NPC) who provides assistance to Mario and his
        friends in most games, but there are times when Toad(s) takes center
        stage and appears as a protagonist, as seen in Super Mario Bros. 2,
        Wario's Woods, Super Mario 3D World, and Captain Toad: Treasure Tracker.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Toad_(Nintendo)'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
  </AriaTabs>
</template>
```

<details>

<summary>Code</summary>

```gjs
import { AriaTabs } from 'ember-aria-tabs';

<template>
  <AriaTabs as |at|>
    <at.tabList as |tl|>
      <tl.tab>Mario</tl.tab>
      <tl.tab @disabled={{true}}>Luigi</tl.tab>
      <tl.tab>Peach</tl.tab>
      <tl.tab>Yoshi</tl.tab>
      <tl.tab>Toad</tl.tab>
    </at.tabList>
    <at.tabPanel>
      <p>
        <b>Mario</b>
        (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (<i>English:
          /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional character in the
        Mario video game franchise, owned by Nintendo and created by Japanese
        video game designer Shigeru Miyamoto. Serving as the company's mascot
        and the eponymous protagonist of the series, Mario has appeared in over
        200 video games since his creation. Depicted as a short, pudgy, Italian
        plumber who resides in the Mushroom Kingdom, his adventures generally
        center upon rescuing Princess Peach from the Koopa villain Bowser. His
        younger brother and sidekick is Luigi.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Mario'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Luigi</b>
        (<i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (<i>English:
          /luˈiːdʒi/; Italian: [luˈiːdʒi]</i>) is a fictional character featured
        in video games and related media released by Nintendo. Created by
        prominent game designer Shigeru Miyamoto, Luigi is portrayed as the
        slightly younger but taller fraternal twin brother of Nintendo's mascot
        Mario, and appears in many games throughout the Mario franchise, often
        as a sidekick to his brother.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Luigi'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Princess Peach</b>
        (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>) is a
        character in Nintendo's Mario franchise. Originally created by Shigeru
        Miyamoto, Peach is the princess of the fictional Mushroom Kingdom, which
        is constantly under attack by Bowser. She often plays the damsel in
        distress role within the series and is the lead female. She is often
        portrayed as Mario's love interest and has appeared in Super Princess
        Peach, where she is the main playable character.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Princess_Peach'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Yoshi</b>
        (<i>ヨッシー Yosshī, [joɕ.ɕiː]</i>) (<i>English: /ˈjoʊʃi/ or /ˈjɒʃi/</i>),
        once romanized as Yossy, is a fictional anthropomorphic dinosaur who
        appears in video games published by Nintendo. Yoshi debuted in Super
        Mario World (1990) on the Super Nintendo Entertainment System as Mario
        and Luigi's sidekick. Yoshi later starred in platform and puzzle games,
        including Super Mario World 2: Yoshi's Island, Yoshi's Story and Yoshi's
        Woolly World. Yoshi also appears in many of the Mario spin-off games,
        including Mario Party and Mario Kart, various Mario sports games, and
        Nintendo's crossover fighting game series Super Smash Bros. Yoshi
        belongs to the species of the same name, which is characterized by their
        variety of colors.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Yoshi'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
    <at.tabPanel>
      <p>
        <b>Toad</b>
        (<i>Japanese: キノピオ Hepburn: Kinopio</i>) is a fictional character
        who primarily appears in Nintendo's Mario franchise. Created by Japanese
        video game designer Shigeru Miyamoto, he is portrayed as a citizen of
        the Mushroom Kingdom and is one of Princess Peach's most loyal
        attendants; constantly working on her behalf. He is usually seen as a
        non-player character (NPC) who provides assistance to Mario and his
        friends in most games, but there are times when Toad(s) takes center
        stage and appears as a protagonist, as seen in Super Mario Bros. 2,
        Wario's Woods, Super Mario 3D World, and Captain Toad: Treasure Tracker.
      </p>
      <p>
        Source:{' '}
        <a
          href='https://en.wikipedia.org/wiki/Toad_(Nintendo)'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wikipedia
        </a>
      </p>
    </at.tabPanel>
  </AriaTabs>
</template>
```

</details>

## Matt Groening Example

```gjs live no-shadow
import { AriaTabs } from 'ember-aria-tabs';

<template>
  <AriaTabs @forceRenderTabPanel={{true}} @defaultIndex={{1}} as |at|>
    <at.tabList as |tl|>
      <tl.tab>The Simpsons</tl.tab>
      <tl.tab>Futurama</tl.tab>
    </at.tabList>
    <at.tabPanel>
      <AriaTabs @forceRenderTabPanel={{true}} as |at2|>
        <at2.tabList as |tl2|>
          <tl2.tab>Homer Simpson</tl2.tab>
          <tl2.tab>Marge Simpson</tl2.tab>
          <tl2.tab>Bart Simpson</tl2.tab>
          <tl2.tab>Lisa Simpson</tl2.tab>
          <tl2.tab>Maggie Simpson</tl2.tab>
        </at2.tabList>
        <at2.tabPanel>
          <p>Husband of Marge; father of Bart, Lisa, and Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png'
            alt='Homer Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png'
            alt='Marge Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Oldest child and only son of Homer and Marge; brother of Lisa and
            Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png'
            alt='Bart Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Middle child and eldest daughter of Homer and Marge; sister of Bart
            and Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png'
            alt='Lisa Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Youngest child and daughter of Homer and Marge; sister of Bart and
            Lisa.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png'
            alt='Maggie Simpson'
          />
        </at2.tabPanel>
      </AriaTabs>
    </at.tabPanel>
    <at.tabPanel>
      <AriaTabs @forceRenderTabPanel={{true}} as |at2|>
        <at2.tabList as |tl2|>
          <tl2.tab>Philip J. Fry</tl2.tab>
          <tl2.tab>Turanga Leela</tl2.tab>
          <tl2.tab>Bender Bending Rodriguez</tl2.tab>
          <tl2.tab>Amy Wong</tl2.tab>
          <tl2.tab>Professor Hubert J. Farnsworth</tl2.tab>
          <tl2.tab>Doctor John Zoidberg</tl2.tab>
        </at2.tabList>
        <at2.tabPanel>
          <p>Protagonist, from the 20th Century. Delivery boy. Many times
            great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png'
            alt='Philip J. Fry'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest
            of Fry.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png'
            alt='Turanga Leela'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot who is
            Fry's best friend. Built in Tijuana, Mexico, he is the Planet
            Express Ship's cook.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png'
            alt='Bender Bending Rodriguez'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Chinese-Martian intern at Planet Express. Fonfon Ru of Kif Kroker.</p>
          <img
            src='https://static.wikia.nocookie.net/enfuturama/images/1/1f/Character_Amy.png/200px-Character_Amy.png'
            alt='Amy Wong'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Many times great-nephew of Fry. CEO and owner of Planet Express
            delivery company. Tenured professor of Mars University.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png'
            alt='Professor Hubert J. Farnsworth'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Alien from Decapod 10. Planet Express' staff doctor and steward.
            Has a medical degree and Ph.D in art history.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png'
            alt='Doctor John Zoidberg'
          />
        </at2.tabPanel>
      </AriaTabs>
    </at.tabPanel>
  </AriaTabs>
</template>
```

<details>

<summary>Code</summary>

```gjs
import { AriaTabs } from 'ember-aria-tabs';

<template>
  <AriaTabs @forceRenderTabPanel={{true}} @defaultIndex={{1}} as |at|>
    <at.tabList as |tl|>
      <tl.tab>The Simpsons</tl.tab>
      <tl.tab>Futurama</tl.tab>
    </at.tabList>
    <at.tabPanel>
      <AriaTabs @forceRenderTabPanel={{true}} as |at2|>
        <at2.tabList as |tl2|>
          <tl2.tab>Homer Simpson</tl2.tab>
          <tl2.tab>Marge Simpson</tl2.tab>
          <tl2.tab>Bart Simpson</tl2.tab>
          <tl2.tab>Lisa Simpson</tl2.tab>
          <tl2.tab>Maggie Simpson</tl2.tab>
        </at2.tabList>
        <at2.tabPanel>
          <p>Husband of Marge; father of Bart, Lisa, and Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png'
            alt='Homer Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png'
            alt='Marge Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Oldest child and only son of Homer and Marge; brother of Lisa and
            Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png'
            alt='Bart Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Middle child and eldest daughter of Homer and Marge; sister of Bart
            and Maggie.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png'
            alt='Lisa Simpson'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Youngest child and daughter of Homer and Marge; sister of Bart and
            Lisa.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png'
            alt='Maggie Simpson'
          />
        </at2.tabPanel>
      </AriaTabs>
    </at.tabPanel>
    <at.tabPanel>
      <AriaTabs @forceRenderTabPanel={{true}} as |at2|>
        <at2.tabList as |tl2|>
          <tl2.tab>Philip J. Fry</tl2.tab>
          <tl2.tab>Turanga Leela</tl2.tab>
          <tl2.tab>Bender Bending Rodriguez</tl2.tab>
          <tl2.tab>Amy Wong</tl2.tab>
          <tl2.tab>Professor Hubert J. Farnsworth</tl2.tab>
          <tl2.tab>Doctor John Zoidberg</tl2.tab>
        </at2.tabList>
        <at2.tabPanel>
          <p>Protagonist, from the 20th Century. Delivery boy. Many times
            great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png'
            alt='Philip J. Fry'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest
            of Fry.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png'
            alt='Turanga Leela'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot who is
            Fry's best friend. Built in Tijuana, Mexico, he is the Planet
            Express Ship's cook.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png'
            alt='Bender Bending Rodriguez'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Chinese-Martian intern at Planet Express. Fonfon Ru of Kif Kroker.</p>
          <img
            src='https://static.wikia.nocookie.net/enfuturama/images/1/1f/Character_Amy.png/200px-Character_Amy.png'
            alt='Amy Wong'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Many times great-nephew of Fry. CEO and owner of Planet Express
            delivery company. Tenured professor of Mars University.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png'
            alt='Professor Hubert J. Farnsworth'
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Alien from Decapod 10. Planet Express' staff doctor and steward.
            Has a medical degree and Ph.D in art history.</p>
          <img
            src='https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png'
            alt='Doctor John Zoidberg'
          />
        </at2.tabPanel>
      </AriaTabs>
    </at.tabPanel>
  </AriaTabs>
</template>
```

</details>

## Avengers Example Example

```gjs live no-shadow
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { AriaTabs } from 'ember-aria-tabs';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import style from 'ember-style-modifier';

export default class AvengersExample extends Component {
  @tracked characters = [
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

  toggleCharacter = (char, index) => {
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
            type='checkbox'
            name={{char.name}}
            checked={{char.checked}}
            {{on 'click' (fn this.toggleCharacter char index)}}
          />
          {{char.name}}&nbsp;
        </label>
      {{/each}}
    </p>

    <AriaTabs
      @selectedTabClassName='avengers-tab--selected'
      @selectedTabPanelClassName='avengers-tab-panel--selected'
      as |at|
    >
      <!-- <at.tabList class='avengers-tab-list' as |tl|>
        {{#each this.characters as |char|}}
          {{#if char.checked}}
            <tl.tab {{style background-color=char.color}} class='avengers-tab'>
              <img src={{char.img}} alt={{char.name}} height='32' width='32' />
            </tl.tab>
          {{/if}}
        {{/each}}
      </at.tabList> -->

      <!-- {{#each this.checkedCharacters as |char|}}
        <at.tabPanel
          {{style background-color=char.color color=char.text}}
          class='avengers-tab-panel'
        >
          {{char.desc}}
        </at.tabPanel>
      {{/each}} -->
    </AriaTabs>
  </template>
}
```

<details>

<summary>Code</summary>

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { AriaTabs } from 'ember-aria-tabs';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import style from 'ember-style-modifier';

export default class AvengersExample extends Component {
  @tracked characters = [
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

  toggleCharacter = (char, index) => {
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
            type='checkbox'
            name={{char.name}}
            checked={{char.checked}}
            {{on 'click' (fn this.toggleCharacter char index)}}
          />
          {{char.name}}&nbsp;
        </label>
      {{/each}}
    </p>

    <AriaTabs
      @selectedTabClassName='avengers-tab--selected'
      @selectedTabPanelClassName='avengers-tab-panel--selected'
      as |at|
    >
      <at.tabList class='avengers-tab-list' as |tl|>
        {{#each this.characters as |char|}}
          {{#if char.checked}}
            <tl.tab {{style background-color=char.color}} class='avengers-tab'>
              <img src={{char.img}} alt={{char.name}} height='32' width='32' />
            </tl.tab>
          {{/if}}
        {{/each}}
      </at.tabList>

      {{#each this.checkedCharacters as |char|}}
        <at.tabPanel
          {{style background-color=char.color color=char.text}}
          class='avengers-tab-panel'
        >
          {{char.desc}}
        </at.tabPanel>
      {{/each}}
    </AriaTabs>
  </template>
}
```

</details>
