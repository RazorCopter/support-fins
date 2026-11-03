// In-app Calibration Guide dialog based on docs/CALIBRATION.md
import { el } from './dom.js';
import { currentLang, t } from './i18n.js';

const DIR = 'calibration/';

const GUIDE_IT = `
<div class="guide-intro-box">
  <p><strong>Supporti 3D</strong> include valori predefiniti tarati su stampe in PLA e PETG su una stampante standard. Ciascuna stampante, filamento e profilo slicer presenta caratteristiche differenti. Ogni provino di test qui descritto calibra un singolo parametro: stampalo, individua il risultato migliore e imposta quel valore nell'applicazione. Ogni elemento ha il valore impresso in rilievo, per una lettura immediata senza consultare schede esterne.</p>
  <p class="guide-tip"><strong>Regola fondamentale:</strong> Stampa i provini con il tuo consueto profilo di slicing mantenendo i <strong>supporti dello slicer DISATTIVATI</strong>. I supporti necessari sono già incorporati all'interno dei file (e il test dell'angolo non ne richiede alcuno).</p>
</div>

<div class="guide-table-wrap">
  <table class="guide-table">
    <thead>
      <tr>
        <th>Provino</th>
        <th>Parametro calibrato</th>
        <th>Posizione nell'app</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Angle</strong></td>
        <td>Soglia inclinazione superfici da supportare</td>
        <td>Cursore <em>Sottosquadro</em> (barra superiore)</td>
      </tr>
      <tr>
        <td><strong>Gap</strong></td>
        <td>Luce di distacco tra pareti e pezzo</td>
        <td>Stampante ▸ Modifica ▸ <em>Luce supporto</em></td>
      </tr>
      <tr>
        <td><strong>Grip</strong></td>
        <td>Quanti denti vincolano ciascuna parete</td>
        <td>Denti ▸ <em>Presa denti</em></td>
      </tr>
      <tr>
        <td><strong>Span</strong></td>
        <td>Capacità di bridging su ampie campate</td>
        <td>Altre impostazioni ▸ <em>Copertura superfici ampie</em></td>
      </tr>
      <tr>
        <td><strong>Pad</strong></td>
        <td>Tolleranza di stacco della base dal piatto</td>
        <td>Altre impostazioni ▸ Pad piatto ▸ <em>Luce pad</em></td>
      </tr>
      <tr>
        <td><strong>Cutouts</strong></td>
        <td>Geometria di alleggerimento pareti alte</td>
        <td><em>Alleggerimenti</em> (sotto Denti)</td>
      </tr>
      <tr>
        <td><strong>Bore</strong></td>
        <td>Facilità di estrazione da fori orizzontali</td>
        <td>Test diagnostico bridging cavità</td>
      </tr>
      <tr>
        <td><strong>Sampler</strong></td>
        <td>Verifica complessiva con tutte le geometrie</td>
        <td>Test finale riassuntivo</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="guide-cards">

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>1. Angle — Angolo di sottosquadro (Stampa questo per primo)</h3>
      <a class="btn sm" href="${DIR}angle-coupon.stl" download="angle-coupon.stl">Scarica STL</a>
    </div>
    <p>Sette rampe inclinate da 10° a 40°, ciascuna con l'angolo in gradi inciso sopra. L'angolo è misurato <strong>dal piatto verso l'alto</strong>, quindi <strong>valori più bassi sono più difficili</strong>: 0° corrisponderebbe a un soffitto orizzontale, 90° a una parete verticale dritta.</p>
    <ul>
      <li>Osserva l'intradosso delle superfici inclinate dopo la stampa.</li>
      <li>La <strong>rampa con l'inclinazione più bassa stampata in modo pulito</strong> (senza cedimenti, sbavature o arricciature di filamento) corrisponde al tuo valore di <strong>Sottosquadro</strong>.</li>
      <li>Le facce con pendenza inferiore a tale valore riceveranno automaticamente i supporti.</li>
      <li>Il cursore si ferma a 30°: se una rampa inferiore a 30° è riuscita pulita, imposta 30°.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>2. Gap — Luce di distacco del supporto</h3>
      <a class="btn sm" href="${DIR}gap-coupon.3mf" download="gap-coupon.3mf">Scarica 3MF</a>
    </div>
    <p>Sei sporgenze sostenute da pareti posizionate a un numero intero di layer vuoti al di sotto: <strong>0.2 mm = 1 layer, 0.4 mm = 2 layer, 0.6 mm = 3 layer</strong>. Lo slicer ragiona a layer interi, pertanto valori intermedi si comporterebbero allo stesso modo.</p>
    <p class="guide-note"><strong>Importante:</strong> Stampa a 0.2 mm di altezza layer, con primo layer da 0.2 mm e altezza layer adattiva disattivata.</p>
    <p>Stacca ciascuna parete a mano:</p>
    <ul>
      <li><strong>Pareti saldate o lacerazione della superficie:</strong> luce troppo piccola.</li>
      <li><strong>Intradosso cascante o con fili sparsi:</strong> luce troppo grande.</li>
      <li>Usa il <strong>minor numero di layer che si stacca in modo pulito</strong> (moltiplicato per 0.2 mm) nel campo <strong>Luce supporto</strong> (default 0.2 mm).</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>3. Grip — Tenuta dei denti di presa</h3>
      <a class="btn sm" href="${DIR}grip-coupon.3mf" download="grip-coupon.3mf">Scarica 3MF</a>
    </div>
    <p>Quattro rampe con tre pareti ciascuna, generate con i quattro livelli di <strong>Presa denti</strong>: <strong>OFF</strong> (denti disattivati), <strong>LIGHT</strong> (cursore tutto a sinistra, predefinito), <strong>MID</strong> (al centro), <strong>FIRM</strong> (tutto a destra). Corrispondono a 0, 5, 7 e 11 denti su ciascuna parete.</p>
    <ul>
      <li>Prima di staccare i supporti, verifica che tutte le pareti siano rimaste saldamente in piedi.</li>
      <li>Stacca poi le pareti e controlla l'intradosso:
        <ul>
          <li>Se una parete si è inclinata o staccata durante la stampa: passa al valore a destra (più presa).</li>
          <li>Se la rampa presenta segni profondi o si è lacerata dove toccavano i denti: passa al valore a sinistra (meno presa).</li>
        </ul>
      </li>
      <li>Usa l'<strong>impostazione più leggera le cui pareti hanno tenuto stabilmente</strong>.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>4. Span — Campata e bridging su superfici ampie</h3>
      <a class="btn sm" href="${DIR}span-coupon.3mf" download="span-coupon.3mf">Scarica 3MF</a>
    </div>
    <p>Cinque ripiani ampi generati con cinque posizioni del cursore <strong>Copertura superfici ampie</strong> (0%, 25%, 50%, 75%, 100%).</p>
    <ul>
      <li>Stacca le pareti e osserva la superficie compresa tra una parete e l'altra.</li>
      <li>Consente di determinare la massima luce libera che la stampante riesce a colmare a ponte (bridging) senza avvallamenti.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>5. Pad — Base e adesione al piatto</h3>
      <a class="btn sm" href="${DIR}pad-coupon.3mf" download="pad-coupon.3mf">Scarica 3MF</a>
    </div>
    <p>Sei cubi disposti in appoggio su uno spigolo. Ciascun cubo è trattenuto sul piatto unicamente da un pad posizionato a una distanza specifica: <strong>0, 0.08, 0.12, 0.16, 0.2, 0.3 mm</strong> (valore inciso sul cubo).</p>
    <ul>
      <li><strong>Il cubo si è staccato durante la stampa:</strong> luce troppo grande.</li>
      <li><strong>Il pad non si stacca o lacera lo spigolo del cubo:</strong> luce troppo piccola.</li>
      <li>Usa la <strong>distanza massima con cui il cubo è rimasto saldo sul piatto</strong>. Imposta Pad piatto su <strong>Personalizzato</strong> con quel valore in <em>Luce pad</em> (con Spessore pad 0.2, Presa pad 0 ed Estensione pad 4).</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>6. Cutouts — Forature di alleggerimento</h3>
      <a class="btn sm" href="${DIR}cutout-coupon.3mf" download="cutout-coupon.3mf">Scarica 3MF</a>
    </div>
    <p>Cinque sporgenze alte, sostenute da pareti forate con i diversi stili: <strong>NONE, DIAMOND, TRIANGLE, ARCH, LATTICE</strong>. I fori alleggeriscono le pareti alte risparmiando fino al 33% di plastica, mantenendo le cuspidi autoportanti senza richiedere ponti.</p>
    <ul>
      <li>Prima di staccare le pareti, verifica che siano rimaste verticali e che il piano sovrastante sia piatto.</li>
      <li>Se una parete forata si è piegata o ha ceduto nei fori: lo stile è troppo aperto per la tua configurazione.</li>
      <li>Scegli lo <strong>stile più aperto le cui pareti hanno retto tutte</strong> (gli stili Arco e Reticolo garantiscono il massimo risparmio di materiale).</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>7. Bore — Fori orizzontali e cavità</h3>
      <a class="btn sm" href="${DIR}bore-coupon.3mf" download="bore-coupon.3mf">Scarica 3MF</a>
    </div>
    <p>Un blocco diagnostico con 8 fori orizzontali da 3, 5, 8 e 12 mm. La serie <strong>A</strong> presenta una parete disposta lungo il foro (come fa l'algoritmo del sito); la serie <strong>X</strong> presenta tre pareti trasversali che attraversano il foro.</p>
    <ul>
      <li>Estrai le pareti tirandole dall'estremità aperta (le pareti X scorrono lungo il canale del foro).</li>
      <li>Verifica quale orientamento esce più pulito e se i fori piccoli (≤ 6 mm) riescono a essere colmati a ponte senza supporti interni intrappolati.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>8. Sampler — Provino generale campionario</h3>
      <a class="btn sm" href="${DIR}sampler-coupon.3mf" download="sampler-coupon.3mf">Scarica 3MF</a>
    </div>
    <p>Un modello completo che raggruppa simultaneamente tutte le geometrie complesse: rampe (40°, 30°, 20°), una sfera, una sporgenza sottile, un tavolo piatto, un fungo su stelo sottile, una cavità, fori orizzontali (3, 6, 12 mm) e un arco, supportati con <strong>Copertura totale</strong> alle impostazioni predefinite.</p>
    <ul>
      <li>Stampa questo provino per ultimo, dopo aver calibrato i parametri precedenti, per visualizzare la qualità complessiva che otterrai sulle tue parti.</li>
      <li>Pezzo e supporti sono due solidi distinti: non usare la funzione Disponi né muoverne uno separatamente dall'altro nello slicer.</li>
    </ul>
  </section>

</div>
`;

const GUIDE_EN = `
<div class="guide-intro-box">
  <p><strong>Supporti 3D</strong> ships numbers tuned on PLA and PETG printed on one printer. Your printer, filament and slicer profile are different. Each test print below sets one setting: print it, find the best rung, and type that number into the site. Every rung is marked with its value raised on top (the angle, the gap in mm, the setting), so there's nothing to look up.</p>
  <p class="guide-tip"><strong>Core rule:</strong> Print them with the slicer profile you normally use, with <strong>slicer supports OFF</strong>. The supports are already in the file (and the angle test needs none).</p>
</div>

<div class="guide-table-wrap">
  <table class="guide-table">
    <thead>
      <tr>
        <th>Test</th>
        <th>Sets</th>
        <th>Where on the site</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Angle</strong></td>
        <td>Which faces need support</td>
        <td>Overhang slider (top bar)</td>
      </tr>
      <tr>
        <td><strong>Gap</strong></td>
        <td>How close walls stand to the part</td>
        <td>Printer ▸ Edit ▸ <em>Support gap</em></td>
      </tr>
      <tr>
        <td><strong>Grip</strong></td>
        <td>How many tines hold each wall</td>
        <td>Tines ▸ <em>Tine grip</em></td>
      </tr>
      <tr>
        <td><strong>Span</strong></td>
        <td>How wide a stretch your printer bridges</td>
        <td>More settings ▸ <em>Wide-face coverage</em> (Auto)</td>
      </tr>
      <tr>
        <td><strong>Pad</strong></td>
        <td>How the bed pad lets go</td>
        <td>More settings ▸ Bed pad ▸ <em>Pad gap</em></td>
      </tr>
      <tr>
        <td><strong>Cutouts</strong></td>
        <td>Which holes your walls can have</td>
        <td><em>Cutouts</em> (below Tines)</td>
      </tr>
      <tr>
        <td><strong>Bore</strong></td>
        <td>Whether holes pull clean</td>
        <td>Diagnostic bridging test</td>
      </tr>
      <tr>
        <td><strong>Sampler</strong></td>
        <td>Every hard shape at once</td>
        <td>Final verification test</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="guide-cards">

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>1. Angle — Overhang angle (Print this first)</h3>
      <a class="btn sm" href="${DIR}angle-coupon.stl" download="angle-coupon.stl">Download STL</a>
    </div>
    <p>Seven ramps, 10° to 40°, each with its angle in degrees written on top. The angle is measured <strong>up from the plate</strong>, so <strong>lower is harder</strong>: 0° would be a flat ceiling, 90° a straight wall.</p>
    <ul>
      <li>Look at the undersides after printing.</li>
      <li>The <strong>shallowest ramp that came out clean</strong> (no droop, no stringy curls) is your <strong>Overhang</strong> setting. Faces shallower than that get support.</li>
      <li>The slider stops at 30°: if a lower ramp came out clean, set 30°.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>2. Gap — Breakaway clearance</h3>
      <a class="btn sm" href="${DIR}gap-coupon.3mf" download="gap-coupon.3mf">Download 3MF</a>
    </div>
    <p>Six ledges, each held by walls standing a whole number of empty layers below it: <strong>0.2 = 1 layer, 0.4 = 2, 0.6 = 3</strong>. A slicer can only leave whole layers there, so in-between gaps print the same.</p>
    <p class="guide-note"><strong>Note:</strong> Print at 0.2 mm layers with a 0.2 mm first layer and adaptive layer height off.</p>
    <p>Snap each wall off:</p>
    <ul>
      <li><strong>Welded, tears the ledge's skin:</strong> gap too small.</li>
      <li><strong>Ledge underside saggy or stringy:</strong> gap too big.</li>
      <li>Use the <strong>fewest layers that snap off clean</strong>, times 0.2, in <strong>Support gap</strong> (default 0.2 mm).</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>3. Grip — Tine grip density</h3>
      <a class="btn sm" href="${DIR}grip-coupon.3mf" download="grip-coupon.3mf">Download 3MF</a>
    </div>
    <p>Four ramps, three walls under each, built at four <strong>Tine grip</strong> settings: <strong>OFF</strong>, <strong>LIGHT</strong> (the default), <strong>MID</strong>, <strong>FIRM</strong>. That's 0, 5, 7 and 11 tines on each wall.</p>
    <ul>
      <li>Before snapping anything off, check that every wall is still standing.</li>
      <li>Then snap the walls off and check each ramp's underside:
        <ul>
          <li>A wall leaned or came loose: go one step right (more grip).</li>
          <li>Ramp marked or torn where the tines were: go one step left (less grip).</li>
        </ul>
      </li>
      <li>Use the <strong>lightest setting whose walls all held</strong>.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>4. Span — Wide overhang bridging</h3>
      <a class="btn sm" href="${DIR}span-coupon.3mf" download="span-coupon.3mf">Download 3MF</a>
    </div>
    <p>Five wide shelves built at five <strong>Wide-face coverage</strong> positions (0%, 25%, 50%, 75%, 100%).</p>
    <ul>
      <li>Snap the walls off and look at each shelf's underside between walls.</li>
      <li>Tells you how wide a bare stretch your printer can bridge without sagging.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>5. Pad — Bed adhesion</h3>
      <a class="btn sm" href="${DIR}pad-coupon.3mf" download="pad-coupon.3mf">Download 3MF</a>
    </div>
    <p>Six cubes standing on an edge. Each pad stands a different gap off its cube: <strong>0, 0.08, 0.12, 0.16, 0.2, 0.3 mm</strong>, written on each cube.</p>
    <ul>
      <li><strong>Cube came loose mid-print:</strong> gap too big.</li>
      <li><strong>Pad won't peel, or tears the cube's edge:</strong> gap too small.</li>
      <li>Use the <strong>biggest gap whose cube stayed put</strong>. Set Bed pad to <strong>Custom</strong> with that in <em>Pad gap</em> (Pad thickness 0.2, Pad grip 0, Pad spread 4).</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>6. Cutouts — Wall cutouts</h3>
      <a class="btn sm" href="${DIR}cutout-coupon.3mf" download="cutout-coupon.3mf">Download 3MF</a>
    </div>
    <p>Five tall ledges, each held by walls cut with one style: <strong>NONE, DIAMOND, TRIANGLE, ARCH, LATTICE</strong>. Cutouts save up to 33% plastic while keeping pointed ceilings that print without bridging.</p>
    <ul>
      <li>Check every wall stood and every ledge printed flat before snapping off.</li>
      <li>A cut wall that leaned or broke apart: style is too open.</li>
      <li>Use the <strong>most open style whose walls all held</strong> (Arch and Lattice save the most material).</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>7. Bore — Sideways holes</h3>
      <a class="btn sm" href="${DIR}bore-coupon.3mf" download="bore-coupon.3mf">Download 3MF</a>
    </div>
    <p>A block with eight sideways holes (3, 5, 8, 12 mm). Set <strong>A</strong> has one wall running along each hole; set <strong>X</strong> has three walls running across the hole.</p>
    <ul>
      <li>Pull walls out along the hole and inspect which came out clean and whether A or X left the smoother hole ceiling.</li>
    </ul>
  </section>

  <section class="guide-card">
    <div class="guide-card-head">
      <h3>8. Sampler — All-in-one test coupon</h3>
      <a class="btn sm" href="${DIR}sampler-coupon.3mf" download="sampler-coupon.3mf">Download 3MF</a>
    </div>
    <p>One comprehensive model with every difficult shape: ramps (40°, 30°, 20°), a ball, a thin ledge, a flat table, a mushroom on a stem, a cave, sideways holes (3, 6, 12 mm) and an arch, supported in <strong>Full coverage</strong>.</p>
    <ul>
      <li>Print last after tuning other settings to verify real-world print behavior.</li>
      <li>Part and supports are separate objects: don't arrange or move one without the other.</li>
    </ul>
  </section>

</div>
`;

let modal = null;
let body = null;
let title = null;

function initModal() {
  modal = el('calibrate-guide-modal');
  if (!modal) return;
  body = el('guide-content');
  title = el('guide-title');

  el('guide-close')?.addEventListener('click', closeGuideModal);
  el('guide-ok')?.addEventListener('click', closeGuideModal);

  // Close on backdrop click
  modal.addEventListener('pointerdown', (e) => {
    if (e.target === modal) closeGuideModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeGuideModal();
    }
  });

  renderGuide();
}

export function renderGuide() {
  if (!body) return;
  const isIt = currentLang === 'it';
  if (title) {
    title.textContent = isIt
      ? 'Calibrazione di Supporti 3D per la tua stampante'
      : 'Tuning Supporti 3D to your printer';
  }
  body.innerHTML = isIt ? GUIDE_IT : GUIDE_EN;
}

export function openGuideModal() {
  if (!modal) initModal();
  if (!modal) return;
  renderGuide();
  modal.hidden = false;
  el('guide-ok')?.focus();
}

export function closeGuideModal() {
  if (!modal) return;
  modal.hidden = true;
}

// Listen for language changes to update guide content
window.addEventListener('languagechange', renderGuide);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  initModal();
}

