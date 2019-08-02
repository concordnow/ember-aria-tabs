# Examples

## Super Mario Example

{{#docs-demo as |demo|}}
  {{#demo.example name="super-mario.hbs"}}
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
          <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (<i>English:
          /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional character in the Mario video
          game franchise, owned by Nintendo and created by Japanese video game designer
          Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist
          of the series, Mario has appeared in over 200 video games since his creation.
          Depicted as a short, pudgy, Italian plumber who resides in the Mushroom
          Kingdom, his adventures generally center upon rescuing Princess Peach from the
          Koopa villain Bowser. His younger brother and sidekick is Luigi.
        </p>
        <p>
          Source:{' '}
          <a href="https://en.wikipedia.org/wiki/Mario" target="_blank">
            Wikipedia
          </a>
        </p>
      </at.tabPanel>
      <at.tabPanel>
        <p>
          <b>Luigi</b> (<i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (<i>English: /luˈiːdʒi/;
          Italian: [luˈiːdʒi]</i>) is a fictional character featured in video games and related media
          released by Nintendo. Created by prominent game designer Shigeru Miyamoto, Luigi is portrayed
          as the slightly younger but taller fraternal twin brother of Nintendo's mascot Mario, and
          appears in many games throughout the Mario franchise, often as a sidekick to his brother.
        </p>
        <p>
          Source:{' '}
          <a href="https://en.wikipedia.org/wiki/Luigi" target="_blank">
            Wikipedia
          </a>
        </p>
      </at.tabPanel>
      <at.tabPanel>
        <p>
          <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
          is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
          Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
          attack by Bowser. She often plays the damsel in distress role within the series and
          is the lead female. She is often portrayed as Mario's love interest and has appeared
          in Super Princess Peach, where she is the main playable character.
        </p>
        <p>
          Source:{' '}
          <a href="https://en.wikipedia.org/wiki/Princess_Peach" target="_blank">
            Wikipedia
          </a>
        </p>
      </at.tabPanel>
      <at.tabPanel>
        <p>
          <b>Yoshi</b> (<i>ヨッシー Yosshī, [joɕ.ɕiː]</i>) (<i>English: /ˈjoʊʃi/ or /ˈjɒʃi/</i>), once
          romanized as Yossy, is a fictional anthropomorphic dinosaur who appears in
          video games published by Nintendo. Yoshi debuted in Super Mario World (1990) on the
          Super Nintendo Entertainment System as Mario and Luigi's sidekick. Yoshi later starred
          in platform and puzzle games, including Super Mario World 2: Yoshi's Island, Yoshi's Story
          and Yoshi's Woolly World. Yoshi also appears in many of the Mario spin-off games, including
          Mario Party and Mario Kart, various Mario sports games, and Nintendo's crossover fighting
          game series Super Smash Bros. Yoshi belongs to the species of the same name, which is
          characterized by their variety of colors.
        </p>
        <p>
          Source:{' '}
          <a href="https://en.wikipedia.org/wiki/Yoshi" target="_blank">
            Wikipedia
          </a>
        </p>
      </at.tabPanel>
      <at.tabPanel>
        <p>
          <b>Toad</b> (<i>Japanese: キノピオ Hepburn: Kinopio</i>) is a fictional character who primarily
          appears in Nintendo's Mario franchise. Created by Japanese video game designer Shigeru Miyamoto,
          he is portrayed as a citizen of the Mushroom Kingdom and is one of Princess Peach's most loyal
          attendants; constantly working on her behalf. He is usually seen as a non-player character (NPC)
          who provides assistance to Mario and his friends in most games, but there are times when Toad(s)
          takes center stage and appears as a protagonist, as seen in Super Mario Bros. 2, Wario's Woods,
          Super Mario 3D World, and Captain Toad: Treasure Tracker.
        </p>
        <p>
          Source:{' '}
          <a href="https://en.wikipedia.org/wiki/Toad_(Nintendo)" target="_blank">
            Wikipedia
          </a>
        </p>
      </at.tabPanel>
    </AriaTabs>
  {{/demo.example}}

  {{demo.snippet "super-mario.hbs"}}
{{/docs-demo}}

## Matt Groening Example

{{#docs-demo as |demo|}}
  {{#demo.example name="matt-groening.hbs"}}
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
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png" alt="Homer Simpson" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png" alt="Marge Simpson" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Oldest child and only son of Homer and Marge; brother of Lisa and Maggie.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png" alt="Bart Simpson" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Middle child and eldest daughter of Homer and Marge; sister of Bart and Maggie.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png" alt="Lisa Simpson" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Youngest child and daughter of Homer and Marge; sister of Bart and Lisa.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png" alt="Maggie Simpson" />
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
            <p>Protagonist, from the 20th Century. Delivery boy. Many times great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png" alt="Philip J. Fry" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest of Fry.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png" alt="Turanga Leela" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot who is Fry's best friend. Built in Tijuana, Mexico, he is the Planet Express Ship's cook.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png" alt="Bender Bending Rodriguez" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Chinese-Martian intern at Planet Express. Fonfon Ru of Kif Kroker.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/FuturamaAmyWong.png/140px-FuturamaAmyWong.png" alt="Amy Wong" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Many times great-nephew of Fry. CEO and owner of Planet Express delivery company. Tenured professor of Mars University.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png" alt="Professor Hubert J. Farnsworth" />
          </at2.tabPanel>
          <at2.tabPanel>
            <p>Alien from Decapod 10. Planet Express' staff doctor and steward. Has a medical degree and Ph.D in art history.</p>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png" alt="Doctor John Zoidberg" />
          </at2.tabPanel>
        </AriaTabs>
      </at.tabPanel>
    </AriaTabs>
  {{/demo.example}}

  {{demo.snippet "matt-groening.hbs"}}
{{/docs-demo}}

## Avengers Example

{{#docs-demo as |demo|}}
  {{#demo.example}}
    <AvengersExample />
  {{/demo.example}}

  {{demo.snippet 'avengers-example.hbs'}}
  {{demo.snippet 'avengers-example.js' label='component.js'}}
{{/docs-demo}}
