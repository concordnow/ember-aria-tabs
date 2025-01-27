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
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png"
            alt="Homer Simpson"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png"
            alt="Marge Simpson"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Oldest child and only son of Homer and Marge; brother of Lisa and
            Maggie.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png"
            alt="Bart Simpson"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Middle child and eldest daughter of Homer and Marge; sister of Bart
            and Maggie.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png"
            alt="Lisa Simpson"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Youngest child and daughter of Homer and Marge; sister of Bart and
            Lisa.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png"
            alt="Maggie Simpson"
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
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png"
            alt="Philip J. Fry"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest
            of Fry.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png"
            alt="Turanga Leela"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot who is
            Fry's best friend. Built in Tijuana, Mexico, he is the Planet
            Express Ship's cook.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png"
            alt="Bender Bending Rodriguez"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Chinese-Martian intern at Planet Express. Fonfon Ru of Kif Kroker.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/FuturamaAmyWong.png/140px-FuturamaAmyWong.png"
            alt="Amy Wong"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Many times great-nephew of Fry. CEO and owner of Planet Express
            delivery company. Tenured professor of Mars University.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png"
            alt="Professor Hubert J. Farnsworth"
          />
        </at2.tabPanel>
        <at2.tabPanel>
          <p>Alien from Decapod 10. Planet Express' staff doctor and steward.
            Has a medical degree and Ph.D in art history.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png"
            alt="Doctor John Zoidberg"
          />
        </at2.tabPanel>
      </AriaTabs>
    </at.tabPanel>
  </AriaTabs>
</template>
