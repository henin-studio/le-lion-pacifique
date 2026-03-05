# Le Lion Pacifique — Alpha Oumar Diallo

Site galerie mobile-first pour l'artiste peintre Alpha Oumar Diallo, actif dans l'espace public à Bruxelles.

**Live** : [le-lion-pacifique.vercel.app](https://le-lion-pacifique.vercel.app)

## Le projet

**Durée** : hackathon 3 jours (mars 2026)
**Objectif** : vitrine culturelle sobre et crédible — montrer l'art sans pousser à l'achat, raconter le parcours sans dramatisation.

### Principes

- **Oeuvre d'abord** — Grands espaces, une oeuvre à la fois quand possible
- **Mobile-first strict** — Navigation tactile, images optimisées, lecture fluide
- **Récit factuel** — Contenu attribué et sourcé, jamais inventé
- **Accessibilité** — Contrastes, navigation clavier, alt text, focus visible, skip-link

### Pages

| Page | État | Description |
|------|------|-------------|
| Accueil | Fait | Hero + carrousel Swiper + à propos + expos + footer |
| Galerie | Fait | Grille 1 col mobile → 3 cols desktop + filtres + GLightbox |
| Fiche oeuvre | À faire | Détail par oeuvre (image, technique, dimensions, disponibilité) |
| Parcours | À faire | Bio en couches : essentiel → repères → texte long |
| Demande de projet | À faire | Formulaire fresque / portrait / atelier |

---

## Stack technique

Vanilla HTML / CSS / JS. Aucun framework, aucun bundler.


## Links figma

Lien Figma
https://www.figma.com/design/zWFGRDij4o2kEylYiD3jeW/Lion-Pacifique?node-id=0-1&t=21oO1WbijT6ksz8U-0

Presentation
https://www.figma.com/deck/JD8g5sSGmObDtS2JtuOuA9/Pr%C3%A9sentation---Le-Lion-Pacifique?node-id=1-33&t=ikvJ1ojB4o32kd4C-1


Github de la version 1
TO add

Github de la version finale après 3 jours:
https://github.com/henin-studio/le-lion-pacifique?tab=readme-ov-file


### Devis dans Assets 
/le-lion-pacifique/assets/Devis.pdf


### Libraries (CDN)

| Library | Version | Usage | Docs |
|---------|---------|-------|------|
| GSAP 3 | @3 | Animations hero, scroll reveal, filtres | [gsap.com](https://gsap.com/docs/v3/) |
| ScrollTrigger | @3 | Nav scroll effects, reveal au scroll | [gsap.com/ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| ScrollToPlugin | @3 | Smooth anchor scroll | [gsap.com/ScrollToPlugin](https://gsap.com/docs/v3/Plugins/ScrollToPlugin/) |
| Lenis | @1 | Smooth scroll desktop (désactivé sur touch) | [lenis.darkroom.engineering](https://lenis.darkroom.engineering/) |
| Swiper | @11 | Carrousel oeuvres phares (accueil) | [swiperjs.com](https://swiperjs.com/) |
| GLightbox | latest | Lightbox images (accueil + galerie) | [glightbox](https://biati-digital.github.io/glightbox/) |
| Lucide Icons | latest | Icônes (instagram, arrow-up-right) | [lucide.dev](https://lucide.dev/) |

### Font

DM Sans — self-hosted en woff2 (4 fichiers dans `assets/fonts/`). Plus de dépendance Google Fonts CDN.

### Composants

- **Nav** : fixe, fond blanc au scroll, masquée en scroll down, underline hover sur desktop
- **Hero** : image plein écran, overlay gradient, titre aligné gauche sur desktop
- **Carrousel** : Swiper freeMode + autoplay, `<figure>` avec titre au hover
- **Galerie** : grille CSS 1→3 cols, filtres GSAP avec animation show/hide, `<figure>` + `<figcaption>` au hover
- **Lightbox** : GLightbox sur toutes les oeuvres (accueil + galerie)
- **Footer** : citation vérifiée, logo, lien Instagram

### Design tokens (variables.css)

```css
--color-bg: #0f0f0f;
--color-white: #ffffff;
--color-text: #f5f5f5;
--color-text-muted: #888;
--color-text-secondary: #444;
--color-text-inverse: #0f0f0f;
--color-border: #ddd;
--color-focus: #1a73e8;
--font-main: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Structure

```
le-lion-pacifique/
├── index.html                  # Accueil
├── pages/
│   └── gallery.html            # Galerie
├── css/
│   ├── fonts.css               # @font-face (DM Sans self-hosted)
│   ├── reset.css               # Reset moderne
│   ├── variables.css           # Custom properties
│   ├── base.css                # Styles globaux
│   ├── layout.css              # Container
│   ├── components.css          # Nav, hero, oeuvres, about, expo, footer, figcaption
│   ├── gallery.css             # Styles page galerie + responsive
│   ├── animations.css          # Reduced motion + scroll reveal
│   └── responsive.css          # Breakpoints tablet/desktop (accueil)
├── js/
│   ├── app.js                  # Point d'entrée, init modules
│   ├── smooth-scroll.js        # Lenis (desktop only)
│   ├── animations.js           # GSAP hero + scroll reveal
│   ├── navigation.js           # Nav scroll effects + anchor links
│   ├── gallery.js              # Swiper + GLightbox init
│   ├── form.js                 # form
├── assets/
│   ├── fonts/                  # DM Sans woff2 (4 fichiers)
│   └── images/
│       ├── logo-alpha.png
│       └── gallery/            # 12 oeuvres + photos artiste
└── README.md
```

---

## Citations vérifiées

Toutes les citations proviennent de l'article Erasmix (Rose Hunlede). L'original est en néerlandais, traduit en français pour le site.

| # | Citation (FR) | Original (NL) | Utilisée sur |
|---|---------------|----------------|--------------|
| 1 | « Seulement si tu le veux vraiment. Chacun a ses propres problèmes, je ne veux pas t'obliger. » | *"Alleen als je dat echt zelf wilt. Iedereen heeft namelijk zijn eigen problemen, ik wil je niet verplichten."* | Footer |
| 2 | « Je rêve d'un endroit à moi, et idéalement je veux juste un hébergement temporaire. » | *"Ik droom van een eigen plek, en het liefst wil ik gewoon een tijdelijk verblijf."* | Galerie |
| 3 | « J'ai fui vers la Belgique, pas pour l'argent, mais parce que dans mon pays j'ai critiqué le régime. » | *"Tien jaar geleden vluchtte ik naar België, niet voor het geld, maar omdat ik in mijn land kritiek had op het regime."* | À Propos |

Culture Urbaine ne contient aucune citation directe (tout est narratif). BX1 : contenu non extractible (vidéo).

## Sources documentaires

| Source | Type | URL |
|--------|------|-----|
| Erasmix (EhB) | Portrait journalistique, 3 citations directes | [journalistiek.mm.ehb.be](https://journalistiek.mm.ehb.be/erasmix/2025/05/13/mensen-in-brussel-alpha-oumar-diallo/) |
| Culture Urbaine | Portrait long format, bio complète, 6 expos | [cultureurbaine.be](https://cultureurbaine.be/alpha-oumar-diallo-lartiste-qui-fait-des-couleurs-une-liberte-sansfrontiere/) |
| BX1 | Article/vidéo | [bx1.be](https://bx1.be/categories/news/alpha-oumar-diallo-peintre-et-demandeur-dasile-prive-de-liberte/) |
| Out.be | Expo "Alpha - Artiste en création" | [out.be](https://www.out.be/fr/evenements/163254_alpha-artiste-en-creation-.html) |
| Instagram | Compte artiste, oeuvres, reels | [@alpha_lion_pacifique](https://www.instagram.com/alpha_lion_pacifique/) |

---

## Développement

```bash
python3 -m http.server 8080
open http://localhost:8080
```

Pas de `npm install`, pas de build. Ouvrir `index.html` dans un navigateur suffit.

### Déploiement

Vercel, connecté au repo GitHub. Chaque push sur `main` redéploie automatiquement.

```bash
vercel --prod    # Redéploiement manuel si besoin
```

### Debug

Tous les JS incluent des `console.log('[module]')`. F12 → Console pour le diagnostic.

---

## Pour la suite

| Page | Libraries potentielles | Pourquoi |
|------|------------------------|----------|
| Fiche oeuvre | GLightbox, ScrollTrigger | Zoom image, contenu déroulable |
| Parcours | ScrollTrigger | Timeline animée des repères (2013→2024) |
| Demande de projet | Aucune | Formulaire natif HTML5 suffit |

<details>
<summary>Libraries évaluées non retenues</summary>

| Library | Raison |
|---------|--------|
| Barba.js | Transitions inter-pages — potentiellement utile plus tard |
| Typed.js | Pas d'effet typewriter prévu |
| Plyr | Pas de contenu vidéo |
| Splitting.js | GSAP gère toutes les animations |
| Vanilla LazyLoad | Native `loading="lazy"` utilisé |
| AOS / Rellax | GSAP ScrollTrigger couvre scroll reveal et parallax |
| Three.js / PixiJS / Vanta.js | WebGL hors scope |
| Open Props / Pico CSS | Custom properties et reset maison |

</details>
