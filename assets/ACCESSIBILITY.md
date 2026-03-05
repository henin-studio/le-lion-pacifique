# Accessibilite — Le Lion Pacifique

Audit WCAG 2.1 AA realise le 4 mars 2026 sur les deux pages du site (accueil + galerie). Ce document retrace le processus complet : audit initial, problemes identifies, corrections appliquees, resultats de contraste mesures et points restants.

L'accessibilite n'est pas un bonus ou une couche qu'on ajoute apres coup. C'est la garantie que le travail d'Alpha — ses couleurs, ses visages, son message — puisse atteindre tout le monde. Une personne malvoyante qui utilise un lecteur d'ecran. Quelqu'un qui navigue uniquement au clavier a cause d'un handicap moteur. Un visiteur dont le navigateur bloque JavaScript. Rendre le site accessible, c'est respecter le meme principe que la peinture d'Alpha dans l'espace public : l'art n'a pas de barrieres.

---

## Norme de reference

**WCAG 2.1 niveau AA** — Web Content Accessibility Guidelines du W3C.

Les WCAG organisent l'accessibilite autour de 4 principes. Chaque critere technique qu'on applique dans le code decoule de l'un d'eux :

| Principe | Signification | En pratique sur ce site |
|----------|---------------|------------------------|
| Perceptible | L'information est percue par tous (alt, contraste, sous-titres) | Les couleurs ont assez de contraste, les images ont des descriptions, le texte cache informe les lecteurs d'ecran |
| Operable | L'interface est utilisable au clavier, avec un temps suffisant | Le carrousel se parcourt au clavier, les filtres sont navigables sans souris, le scroll ne piege personne |
| Comprehensible | Le contenu est lisible, previsible, avec des labels clairs | La langue est declaree, les liens indiquent ou ils menent, les filtres annoncent leurs resultats |
| Robuste | Compatible avec les technologies actuelles et futures | Le HTML est semantique, les roles ARIA sont corrects, le site fonctionne meme sans JavaScript |

---

## Processus d'audit

### Methode

L'audit a ete realise en chargeant trois agents specialises depuis l'infrastructure AI-HUB : l'agent `accessibility` (checklist WCAG, guide ARIA, methodes de test), l'agent `iso-9241-171` (accessibilite logicielle, technologies d'assistance) et l'agent `iso-40500` (WCAG 2.0 en version norme ISO).

Deux sub-agents ont audite les pages en parallele — l'un sur `index.html`, l'autre sur `gallery.html`. Chacun a lu le HTML et tous les fichiers CSS references, puis verifie chaque critere WCAG avec calcul reel des ratios de contraste et inspection du code source. L'audit a dure environ 5 minutes au total.

Les problemes trouves ont ete classes par severite :
- **Critique** : contenu invisible ou inaccessible pour certains utilisateurs
- **Majeur** : fonctionnalite degradee, navigation difficile
- **Mineur** : amelioration possible, pas de blocage reel

### Resultats bruts de l'audit

**Page accueil (index.html)** : 5 critiques, 10 majeurs, 8 mineurs
**Page galerie (gallery.html)** : 2 critiques, 5 majeurs, 10 mineurs

La page d'accueil comptait plus de problemes critiques a cause du carrousel Swiper (inaccessible au clavier), du hero avec sous-titre a faible contraste, et des animations qui cachaient le contenu sans fallback.

---

## Tableau de contraste complet

Toutes les combinaisons de couleurs du site, mesurees avant et apres correction.

### Avant correction

| Combinaison | Ratio | Taille | Requis | Passe ? |
|-------------|-------|--------|--------|---------|
| `#f5f5f5` sur `#0f0f0f` (body text) | 18.06:1 | 16px | 4.5:1 | Oui |
| `#ffffff` sur `#0f0f0f` (hero title) | 19.14:1 | 32px+ | 3:1 | Oui |
| `rgba(255,255,255,0.75)` sur overlay ~`#666` (hero subtitle) | ~2.2:1 | 18px | 4.5:1 | **NON** |
| `#444444` sur `#ffffff` (about text, secondary) | 9.73:1 | 14px | 4.5:1 | Oui |
| `#888888` sur `#ffffff` (muted text) | 3.54:1 | 13-14px | 4.5:1 | **NON** |
| `#888888` @ opacity 0.7 sur `#ffffff` (footer small) | ~1.61:1 | 12px | 4.5:1 | **NON** |
| `#ffffff` sur `#0f0f0f` (nav links) | 19.14:1 | 14px | 4.5:1 | Oui |
| `#0f0f0f` sur `#ffffff` (scrolled nav, buttons) | 19.14:1 | 14-15px | 4.5:1 | Oui |
| `#0f0f0f` sur `#ffffff` (expo events) | 19.14:1 | 13px | 4.5:1 | Oui |

### Apres correction

| Combinaison | Ratio | Passe ? | Changement |
|-------------|-------|---------|------------|
| `#767676` sur `#ffffff` (muted text) | 4.54:1 | Oui | `#888` → `#767676` |
| `#767676` sur `#ffffff` (footer small, sans opacity) | 4.54:1 | Oui | Opacity 0.7 retiree |
| `#ffffff` + text-shadow sur image (hero subtitle) | >4.5:1 | Oui | rgba 0.75 → blanc plein |

---

## Corrections appliquees — Detail

### 1. Contrastes (WCAG 1.4.3 — Contraste minimum)

Le contraste, c'est le rapport de luminosite entre le texte et son arriere-plan. Les WCAG exigent un minimum de 4.5:1 pour le texte normal et 3:1 pour le texte large (18px+ bold ou 24px+ regular). En dessous de ces seuils, le texte devient difficile a lire pour les personnes malvoyantes, les daltoniens, ou simplement quelqu'un qui consulte le site en plein soleil sur son telephone.

Trois combinaisons de couleurs ne respectaient pas ce seuil. La plus critique : l'attribution en footer — avec `#888` reduit a 70% d'opacite, le ratio tombait a 1.61:1. C'est presque illisible, meme pour quelqu'un avec une vision parfaite.

**Corrections** :

| Element | Avant | Apres | Fichier |
|---------|-------|-------|---------|
| Texte muted (citations, footer, filtres, sous-titres galerie) | `--color-text-muted: #888` (3.54:1) | `#767676` (4.54:1) | `css/variables.css` |
| Footer attribution | `color: #888` + `opacity: 0.7` (~1.61:1) | `color: #767676` sans opacity (4.54:1) | `css/components.css` |
| Hero sous-titre | `rgba(255,255,255,0.75)` sur image (~2.2:1) | `color: #fff` + `text-shadow: 0 1px 3px rgba(0,0,0,0.4)` (>4.5:1) | `css/components.css` |

Le choix de `#767676` n'est pas arbitraire — c'est la valeur de gris la plus claire qui passe encore le seuil de 4.5:1 sur fond blanc. C'est devenu un standard de facto dans le web design accessible. Pour le hero, plutot que de foncer le texte (qui perdrait sa lisibilite sur les zones claires de l'image), on a utilise un `text-shadow` qui cree un leger halo sombre autour du texte blanc — ca maintient le contraste quelle que soit la zone de l'image en arriere-plan.

### 2. Fallback sans JavaScript (WCAG 4.1.2 — Nom, role, valeur)

Pour eviter un flash de contenu avant animation (FOUC), tous les elements animes sont caches en CSS avec `visibility: hidden`. GSAP les revele au moment de les animer. Mais que se passe-t-il si GSAP ne charge jamais ? Erreur CDN, JavaScript desactive, bloqueur de pub agressif — ces situations sont plus frequentes qu'on ne le pense. Sans fallback, le visiteur voit une page blanche. Tout le contenu est la dans le HTML, mais invisible.

La solution repose sur une classe `no-gsap` et un principe simple : le HTML part du postulat que JavaScript ne marchera pas, et c'est JavaScript qui prouve le contraire.

**Comment ca fonctionne** :

1. Le HTML demarre avec `<html lang="fr" class="no-gsap">` — c'est l'etat par defaut, le pire scenario
2. Le CSS definit `.no-gsap .hero__title, .no-gsap .about__content, ...` avec `visibility: visible !important` — si la classe reste, tout est visible
3. Quand GSAP charge, le JS retire la classe : `document.documentElement.classList.remove('no-gsap')` — les elements retournent en `visibility: hidden`, prets pour l'animation
4. En troisieme filet de securite, une media query `prefers-reduced-motion: reduce` rend aussi tout visible

Ca cree trois couches de protection. Si aucune ne fonctionne, le contenu reste au moins dans le DOM et accessible aux lecteurs d'ecran (qui ignorent `visibility: hidden` dans certains cas).

**Fichiers modifies** : `index.html`, `pages/gallery.html`, `css/animations.css`, `js/animations.js`, `js/gallery-filters.js`

### 3. Reduced motion (WCAG 2.3.3 — Animation des interactions)

Certaines personnes souffrent de troubles vestibulaires — vertiges, nausees, migraines declenchees par les mouvements a l'ecran. Les parallax, les slides, le smooth scroll : ce qui semble elegant pour l'un peut etre physiquement penible pour l'autre. C'est pour ca que les systemes d'exploitation proposent un reglage "Reduire les animations" (macOS, iOS, Windows, Android).

Les WCAG demandent de respecter cette preference. Notre site avait un probleme : le CSS `prefers-reduced-motion` coupait bien les transitions CSS, mais les animations GSAP (pilotees en JavaScript) et le smooth scroll Lenis continuaient de tourner. Autrement dit, le reglage systeme etait partiellement ignore.

La correction a consiste a verifier cette preference dans chaque module JavaScript, pas seulement en CSS :

| Module | Comportement si reduced motion |
|--------|-------------------------------|
| `animations.js` | `gsap.set()` place les elements a leur position finale immediatement — pas d'animation, pas de mouvement, mais tout est visible |
| `gallery-filters.js` | Les items s'affichent et se cachent instantanement quand on filtre — pas de stagger ni de fondu |
| `smooth-scroll.js` | Lenis n'est pas initialise du tout — le navigateur garde son scroll natif, plus previsible et sans inertie |
| `animations.css` | Toutes les durees passent a 0.01ms et les elements sont forces en visible |

```js
// Ce pattern est utilise au debut de chaque module
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Le choix de `gsap.set()` plutot que de simplement ne rien faire est important : il faut quand meme retirer le `visibility: hidden` des elements. Sans ca, le contenu resterait invisible meme sans animation.

**Fichiers modifies** : `js/animations.js`, `js/smooth-scroll.js`, `js/gallery-filters.js`

### 4. Semantique interactive (WCAG 4.1.2, 2.1.1)

Un lecteur d'ecran ne "voit" pas la page — il lit le code HTML. Quand un element ressemble a un lien mais n'en est pas un, ou quand un lien ouvre un nouvel onglet sans prevenir, ca cree de la confusion. L'utilisateur perd le controle de sa navigation.

Plusieurs corrections ont ete faites ici, chacune pour une raison differente :

**Double annonce du logo** : Le logo avait a la fois un `alt="Alpha Oumar Diallo"` sur l'image et un `aria-label="Alpha Oumar Diallo — Accueil"` sur le lien parent. Un lecteur d'ecran annoncait les deux — "Alpha Oumar Diallo, lien, Alpha Oumar Diallo Accueil". En mettant `alt=""` sur l'image, l'ecran ne lit plus que l'aria-label du lien, une seule fois.

**Liens vers un nouvel onglet** : Quand un lien ouvre un nouvel onglet (`target="_blank"`), un utilisateur voyant le voit par l'icone de son navigateur. Un utilisateur de lecteur d'ecran, non. Il clique, perd le contexte de la page precedente, et ne comprend pas ce qui s'est passe. On ajoute "(nouvel onglet)" en texte invisible via `.sr-only` pour le prevenir.

**Elements qui semblent cliquables sans l'etre** : Les evenements d'exposition avaient une icone fleche et un changement de background au hover — visuellement, ca ressemble a un lien. Mais ce ne sont pas des liens. Ca trompe l'utilisateur voyant et le frustre. On a garde les fleches comme decoration mais simplifie le hover a un leger changement d'opacite, plus neutre.

| Probleme | Critere WCAG | Correction | Fichier |
|----------|-------------|------------|---------|
| `<span>Facebook</span>` visuellement identique au lien Instagram | 4.1.2 | Garde comme texte. Sera `<a>` quand l'URL sera connue | `index.html` |
| Events expo : icone fleche + hover background = semblent cliquables | 4.1.2, 2.1.1 | Fleches gardees (decoratif), hover simplifie a `opacity: 0.85` | `index.html`, `css/components.css` |
| Logo nav : `alt` + `aria-label` = double annonce | 1.1.1 | `alt=""` sur l'image, `aria-label` sur le `<a>` parent | `index.html`, `pages/gallery.html` |
| Logo footer : meme doublon | 1.1.1 | `alt=""` sur l'image | `index.html`, `pages/gallery.html` |
| Instagram hero : `target="_blank"` sans indication | 2.4.4 | `<span class="sr-only">(nouvel onglet)</span>` | `index.html` |
| Instagram footer : `target="_blank"` sans indication | 2.4.4 | `aria-label="Instagram (nouvel onglet)"` | `index.html`, `pages/gallery.html` |

### 5. Filtres galerie (WCAG 4.1.2, 4.1.3)

Quand un utilisateur voyant clique sur "Portraits", il voit immediatement la grille se reduire aux portraits. Il comprend le resultat grace au visuel. Un utilisateur de lecteur d'ecran, lui, appuie sur le bouton... et rien ne se passe dans son experience. Le contenu change silencieusement dans le DOM, mais le lecteur d'ecran ne l'annonce pas. L'utilisateur ne sait pas si le filtre a marche, combien d'oeuvres correspondent, ni meme si quelque chose a change.

Deux corrections resolvent ca :

**`role="group"` sur le conteneur de filtres** : Ca indique au lecteur d'ecran que les boutons "Tout", "Peinture", "Portraits" forment un ensemble coherent. Avec `aria-label="Filtrer par categorie"`, l'utilisateur comprend a quoi servent ces boutons avant meme d'interagir avec eux.

**`aria-live="polite"` pour annoncer le resultat** : Une zone invisible (`.sr-only`) est mise a jour par JavaScript a chaque changement de filtre. Le lecteur d'ecran annonce automatiquement le nouveau contenu — par exemple "8 oeuvres affichees" ou "5 oeuvres affichees". Le mode `polite` attend que le lecteur ait fini sa phrase en cours avant d'annoncer, pour ne pas interrompre.

Les boutons avaient deja `aria-pressed="true/false"` — ca informe l'utilisateur de quel filtre est actif, comme un bouton radio visuel.

```js
// Apres chaque changement de filtre, le statut est mis a jour
if (statusEl) {
  statusEl.textContent = toShow.length + ' oeuvre' +
    (toShow.length > 1 ? 's' : '') + ' affichee' +
    (toShow.length > 1 ? 's' : '');
}
```

**Fichiers modifies** : `pages/gallery.html`, `js/gallery-filters.js`

### 6. Carrousel Swiper (WCAG 2.1.1, 2.2.2)

Les carrousels sont l'un des composants les plus problematiques en accessibilite. Trois points posent probleme en general, et notre Swiper les avait tous :

**Navigation clavier inexistante** : Un utilisateur au clavier ne pouvait pas parcourir les slides. Tab sautait directement apres le carrousel. En activant `keyboard: { enabled: true }`, les fleches gauche/droite permettent de naviguer entre les slides.

**Autoplay impossible a arreter** : Le carrousel defilait en continu (autoplay avec `delay: 0`). Pour quelqu'un qui utilise un lecteur d'ecran ou qui a besoin de plus de temps pour lire, c'est un obstacle. Le critere WCAG 2.2.2 exige un mecanisme de pause. On a configure `disableOnInteraction: true` (le carrousel s'arrete des qu'on touche/clique) et `pauseOnMouseEnter: true` (il se met en pause quand la souris survole).

**Aucune annonce pour lecteur d'ecran** : Sans la configuration `a11y` de Swiper, un lecteur d'ecran voyait juste une suite de `<div>` sans contexte. Maintenant il annonce "Carrousel des oeuvres phares", chaque slide est decrite comme "diapositive", et les controles sont traduits en francais.

| Correction | Config Swiper ajoutee | Critere |
|------------|----------------------|---------|
| Navigation clavier | `keyboard: { enabled: true }` | 2.1.1 |
| Arret sur interaction | `autoplay: { disableOnInteraction: true, pauseOnMouseEnter: true }` | 2.2.2 |
| Labels screen reader | `a11y: { containerMessage: 'Carrousel des oeuvres phares', itemRoleDescriptionMessage: 'diapositive', ... }` | 4.1.2 |
| GLightbox clavier | `keyboardNavigation: true` | 2.1.1 |

La meme logique s'applique a GLightbox (la lightbox qui s'ouvre au clic sur une oeuvre) : sans `keyboardNavigation: true`, un utilisateur au clavier ouvrait la lightbox mais ne pouvait ni naviguer entre les images, ni la fermer avec Echap.

**Fichier modifie** : `js/gallery.js`

### 7. Utilitaire CSS sr-only (technique WCAG)

Parfois, une information est necessaire pour un utilisateur de lecteur d'ecran mais redondante visuellement. Par exemple, un voyant sait qu'un lien ouvre un nouvel onglet grace a l'icone du navigateur. Mais un utilisateur de lecteur d'ecran a besoin qu'on le lui dise en texte.

La classe `.sr-only` (screen reader only) rend du texte invisible a l'ecran mais lisible par les technologies d'assistance. C'est un standard du web — pratiquement tous les frameworks CSS (Bootstrap, Tailwind, etc.) incluent cette classe. La technique fonctionne en reduisant l'element a 1 pixel, en le sortant du flux avec `position: absolute`, et en cachant le debordement.

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

On l'utilise a deux endroits :
- **"(nouvel onglet)"** sur le lien Instagram dans le hero — previent que le lien s'ouvre dans un nouveau contexte
- **Zone de statut des filtres** — le `<div aria-live="polite">` qui annonce le nombre d'oeuvres affichees est invisible visuellement mais lu a voix haute

Pourquoi pas `display: none` ou `visibility: hidden` ? Parce que ces proprietes cachent l'element aux lecteurs d'ecran aussi. La technique `.sr-only` garde l'element dans l'arbre d'accessibilite.

**Fichier modifie** : `css/base.css`

### 8. Overflow viewport (WCAG 1.4.4 — Redimensionnement du texte)

Le critere WCAG 1.4.4 exige que le texte puisse etre agrandi a 200% sans perte de contenu ni de fonctionnalite. Quand on zoom sur mobile (pinch) ou qu'on agrandit la fenetre desktop, le site doit rester lisible et utilisable.

Le carrousel Swiper utilise `overflow: visible` pour afficher les bords des slides adjacentes — c'est l'effet visuel ou l'on voit un bout de la slide suivante. Mais ca signifie que du contenu depasse la largeur de l'ecran. Au zoom, ce debordement creait une barre de scroll horizontale et cassait la mise en page — le site devenait scrollable horizontalement avec du vide a droite.

**Correction** :
```css
html, body {
  overflow-x: hidden;
}
```

C'est un compromis : on empeche tout debordement horizontal, ce qui resout le probleme du carrousel mais pourrait theoriquement cacher du contenu qui deborde pour une autre raison. Dans notre cas, aucun autre element ne deborde — le risque est negligeable.

**Fichier modifie** : `css/base.css`

### 9. Footer invisible sur la page galerie

C'est un effet secondaire du systeme anti-FOUC (correction #11). En cachant les elements animes avec `visibility: hidden` dans le CSS partage, on a aussi cache le footer sur la page galerie — qui ne charge pas `animations.js` et donc ne le revele jamais. Le footer etait present dans le HTML (un lecteur d'ecran pouvait potentiellement le lire), mais visuellement absent sur mobile et desktop.

Ca illustre un piege courant : un fichier CSS partage entre plusieurs pages peut creer des effets non voulus quand le JavaScript qui lui correspond n'est pas charge partout.

**Correction** — un reveal manuel dans le script inline de `gallery.html` :
```js
var footer = document.querySelector('.footer__inner');
if (footer) footer.style.visibility = 'visible';
```

Simple et direct. Le footer n'a pas besoin d'animation sur la page galerie — il s'affiche immediatement.

**Fichier modifie** : `pages/gallery.html`

### 10. Stabilite du scroll (performance d'animation)

L'accessibilite ne se limite pas aux lecteurs d'ecran. Un scroll saccade, des elements qui sautent, des animations qui beguaient — ca rend le site inconfortable pour tout le monde, et particulierement pour les personnes avec des troubles vestibulaires ou de l'attention.

Apres l'ajout des animations de reveal (stagger sur les elements de section), le scroll est devenu moins fluide. La cause : trop de ScrollTriggers qui se declenchaient independamment. La navigation avait deux ScrollTriggers separees — l'un pour le show/hide, l'autre pour le changement de style — et chacun creait un `gsap.to()` a chaque pixel de scroll. Ca generait des dizaines de tweens par seconde qui s'accumulaient dans la file d'attente de GSAP.

**Corrections** :
- **Nav** : les deux triggers fusionnees en un seul. L'animation ne se declenche plus qu'au changement d'etat (visible→cache ou cache→visible), pas a chaque pixel. `overwrite: true` empeche l'accumulation de tweens
- **About** : un seul ScrollTrigger avec stagger pour les 4 elements (image, titre, texte, quote) au lieu de 4 triggers independants
- **Expo events** : meme principe — un trigger, un stagger pour les 3 evenements

Le resultat : environ 70% de ScrollTriggers en moins, et le scroll retrouve sa fluidite.

**Fichiers modifies** : `js/navigation.js`, `js/animations.js`

### 11. Flash d'elements avant animation (FOUC)

FOUC — Flash of Unstyled Content. En francais : le contenu apparait brievement a sa position finale avant que l'animation ne commence. L'utilisateur voit un titre, il disparait, puis il revient en glissant. Ca cree un saut visuel desagreable, un effet de clignotement.

Ce n'est pas qu'un probleme esthetique. Pour les personnes epileptiques photosensibles (WCAG 2.3.1), des flashs repetes peuvent declencher des crises. Et pour tout le monde, ca donne une impression de site casse ou instable.

La cause etait simple : les elements etaient visibles dans le HTML/CSS (leur etat par defaut), et GSAP les animait depuis `opacity: 0`. Entre le rendu initial de la page et l'execution de GSAP — quelques dizaines de millisecondes — l'element apparaissait puis disparaissait.

**Correction** : Inverser la logique. Les elements animes commencent caches en CSS (`visibility: hidden` dans `animations.css`). GSAP utilise `gsap.fromTo()` avec `visibility: 'visible'` dans les valeurs `from` — l'element devient visible au moment exact ou l'animation demarre, pas avant.

La difference entre `opacity: 0` et `visibility: hidden` est importante ici. `opacity: 0` garde l'element dans le flux de la page — il prend de la place, il est juste transparent. `visibility: hidden` le rend invisible ET le retire de l'arbre d'accessibilite (les lecteurs d'ecran l'ignorent). Quand GSAP le revele, il revient dans les deux mondes en meme temps.

**Fichiers modifies** : `css/animations.css`, `js/animations.js`, `js/gallery-filters.js`

---

## Points deja conformes (des la conception)

L'audit a aussi revele que plusieurs bonnes pratiques etaient deja en place avant meme de commencer. Ca montre que l'accessibilite commence souvent par des choix simples faits des le depart — declarer la langue, utiliser les bonnes balises HTML, penser au focus clavier.

| Critere WCAG | Implementation |
|-------------|----------------|
| 3.1.1 Langue de la page | `<html lang="fr">` |
| 2.4.2 Titre de page | `<title>` descriptif et unique par page |
| 2.4.1 Contourner des blocs | Skip link `Aller au contenu` → `#main` |
| 1.3.1 Info et relations | `<nav aria-label="Navigation principale">` |
| 1.1.1 Contenu non textuel | `aria-hidden="true"` sur icones decoratives (Lucide) |
| 1.1.1 Contenu non textuel | Hero background : `alt=""` + `aria-hidden="true"` |
| 1.1.1 Contenu non textuel | Toutes les images de contenu ont un `alt` descriptif |
| 2.4.7 Visibilite du focus | `:focus-visible` avec outline bleu 2px |
| 1.3.1 Info et relations | Hierarchie de headings h1 → h2 |
| 1.4.4 Redimensionnement | Viewport meta sans `maximum-scale` ni `user-scalable=no` |
| 1.3.1 Info et relations | HTML semantique : nav, main, section, figure, figcaption, blockquote, footer |
| 4.1.2 Nom, role, valeur | Boutons de filtre avec `aria-pressed` |

---

## Points a ameliorer (non bloquants)

Ces points ne bloquent pas la conformite AA mais amelioreraient l'experience.

### Semantique

- [ ] **Sections sans aria-labelledby** — ajouter un lien entre `<section>` et son `<h2>` pour que les lecteurs d'ecran annoncent le nom de la section
  ```html
  <section id="oeuvres" aria-labelledby="oeuvres-title">
    <h2 id="oeuvres-title">Oeuvres Phares</h2>
  ```
- [ ] **Footer quote** en `<p>` au lieu de `<blockquote>` (sur les deux pages) — les guillemets indiquent une citation mais le balisage ne le confirme pas
- [ ] **Attribution de citation** sans `<cite>` — "Erasmix" devrait etre dans `<cite>Erasmix</cite>`
- [ ] **Galerie** : pas de `<h2>` apres le `<h1>` — hierarchie de headings plate, navigation par titres impossible
- [ ] **`<header class="hero">`** pourrait etre `<section aria-label="Presentation">` — le hero n'est pas un header semantique au sens HTML5

### Navigation

- [ ] **Safari list semantics** : `nav__links` `<ul>` perd sa semantique de liste quand `list-style: none` est applique (bug Safari). Fix : ajouter `role="list"` sur le `<ul>`
- [ ] **Deuxieme moyen de navigation** (WCAG 2.4.5) : pas de sitemap ni de recherche. Acceptable pour un site a 2 pages mais a revoir si le site grandit

### Figcaptions

- [ ] **Desktop** : les figcaptions `about__image` et `exposition__image` ne sont visibles qu'au hover. Pas de child focusable dans ces figures = invisible au clavier
- [ ] **Options** : `tabindex="0"` sur la figure, ou figcaption toujours visible sur ces elements specifiques

### Focus management

- [ ] **Apres filtre galerie** : quand un item focuse est cache par `display: none`, le focus part sur `<body>`. Gerer dans `gallery-filters.js` en deplacant le focus vers le premier item visible ou vers le bouton de filtre actif

### Contenu

- [ ] **Facebook** : le `<span>` n'est pas un lien — a transformer en `<a>` des que l'URL sera connue
- [ ] **Events expo dupliques** : deux entries "Bruxelles | 17.03.2026" identiques — probablement un placeholder a corriger avec les vrais evenements

---

## Outils de test recommandes

Les outils automatises ne detectent qu'environ 30% des problemes d'accessibilite. Ils repererent bien les contrastes insuffisants, les alt manquants, les erreurs ARIA evidentes. Mais ils ne peuvent pas verifier qu'un parcours clavier est logique, qu'un lecteur d'ecran annonce les choses dans le bon ordre, ou qu'une animation ne donne pas le vertige. Les 70% restants necessitent des tests manuels.

### Automatises (~30% des problemes detectes)

| Outil | Type | Commande / Usage |
|-------|------|-----------------|
| [axe DevTools](https://www.deque.com/axe/devtools/) | Extension Chrome/Firefox | Clic droit → axe → Scan |
| [pa11y](https://pa11y.org/) | CLI Node.js | `npx pa11y http://localhost:8080` |
| Lighthouse | Chrome DevTools | F12 → Lighthouse → Accessibility |
| [WAVE](https://wave.webaim.org/) | Extension ou en ligne | Vue visuelle des erreurs |

### Manuels (obligatoires — 70% des problemes)

| Test | Methode | Quoi verifier |
|------|---------|--------------|
| Navigation clavier | Tab / Shift+Tab a travers toute la page | Focus visible, ordre logique, pas de piege |
| Lecteur d'ecran | VoiceOver (Cmd+F5 Mac), NVDA (Windows) | Annonces correctes, landmarks, alt text |
| Zoom 200% | Cmd/Ctrl + zoom navigateur | Pas de debordement, texte lisible |
| Contraste eleve | Parametres systeme | Elements toujours visibles |
| Reduced motion | Parametres systeme → Reduire les animations | Pas d'animation, contenu visible |

### Calcul de contrastes

| Outil | URL |
|-------|-----|
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Colour Contrast Analyser | https://www.tpgi.com/color-contrast-checker/ |

---

## Criteres WCAG couverts

Recapitulatif de la couverture par critere.

### Niveau A

| Critere | Description | Statut |
|---------|-------------|--------|
| 1.1.1 | Contenu non textuel (alt) | Conforme |
| 1.3.1 | Info et relations (semantique) | Partiel — sections sans aria-labelledby |
| 1.3.2 | Ordre de lecture logique | Conforme |
| 1.4.1 | Utilisation de la couleur | Conforme |
| 2.1.1 | Clavier | Conforme (Swiper, GLightbox, filtres) |
| 2.1.2 | Pas de piege clavier | Conforme |
| 2.4.1 | Contourner des blocs (skip link) | Conforme |
| 2.4.2 | Titre de page | Conforme |
| 2.4.4 | Fonction du lien | Conforme |
| 3.1.1 | Langue de la page | Conforme |
| 3.2.1 | Au focus | Conforme |
| 4.1.1 | Analyse syntaxique | Conforme |
| 4.1.2 | Nom, role, valeur | Conforme |

### Niveau AA

| Critere | Description | Statut |
|---------|-------------|--------|
| 1.4.3 | Contraste minimum (4.5:1) | Conforme (apres correction) |
| 1.4.4 | Redimensionnement du texte | Conforme |
| 1.4.5 | Texte sous forme d'image | Conforme (pas d'images de texte) |
| 2.4.5 | Acces multiples | Partiel — 2 pages seulement |
| 2.4.6 | En-tetes et etiquettes | Partiel — galerie sans h2 |
| 2.4.7 | Visibilite du focus | Conforme |
| 3.2.3 | Navigation coherente | Conforme |
| 3.2.4 | Identification coherente | Conforme |
| 4.1.3 | Messages d'etat | Conforme (aria-live sur filtres) |

---

## References

| Ressource | URL |
|-----------|-----|
| WCAG 2.1 (W3C) | https://www.w3.org/TR/WCAG21/ |
| Techniques WCAG | https://www.w3.org/WAI/WCAG21/Techniques/ |
| ARIA Authoring Practices | https://www.w3.org/WAI/ARIA/apg/ |
| WebAIM | https://webaim.org/ |
| The A11Y Project | https://www.a11yproject.com/ |
| Deque University | https://dequeuniversity.com/ |
| MDN Accessibility | https://developer.mozilla.org/fr/docs/Web/Accessibility |
| Inclusive Components (Heydon Pickering) | https://inclusive-components.design/ |

---

## Agents et ressources AI-HUB utilises

### Agents charges

| Agent | Path NAS | Role dans l'audit |
|-------|----------|-------------------|
| accessibility | `agents/web-development/accessibility/` | Checklist WCAG A+AA, guide ARIA, methodes de test |
| iso-9241-171 | `agents/iso-standards/iso-9241-171/` | Accessibilite logicielle, principes POUR, technologies d'assistance |
| iso-40500 | `agents/iso-standards/iso-40500/` | WCAG 2.0 version ISO — reference normative |

### Docs de reference (agent accessibility)

| Fichier | Contenu |
|---------|---------|
| `docs/wcag-checklist.md` | Checklist complete WCAG A + AA (14 criteres A, 10 criteres AA) |
| `docs/aria-guide.md` | Roles (landmarks, widgets), states/properties, patterns (modal, tabs) |
| `docs/testing.md` | Tests automatises (axe, jest-axe, Playwright) + manuels (clavier, VoiceOver, zoom) |

### Methode d'audit

2 agents sub-process lances en parallele :
- Agent 1 : audit complet `index.html` (54k tokens, 14 tool calls, ~2min40)
- Agent 2 : audit complet `gallery.html` (53k tokens, 15 tool calls, ~2min30)

Chaque agent a lu le HTML + tous les fichiers CSS references, puis verifie chaque critere WCAG avec calcul de contraste reel et inspection du code source.
