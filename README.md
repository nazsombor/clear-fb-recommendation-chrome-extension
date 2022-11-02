# A Facebook "Neked javasoltak" bejegyzések elrejtése
## Chrome extension
Ez a böngésző bővítmény elrejti az összes olyan Facebook-os bejegyzést, ami nem ismerősőktől, vagy követett csoportoktól és oldalaktól származnak. Azok számára javasolt, akik úgy érzik nem ütik meg a kívánt színvonalat ezek a bejegyzések.

Fontos: mivel ez egy olyan bővítmény, ami a facebook-ozásodra rálát és módosítja, érdemes ránézni a kódra.

- A manifest.json fájl minden bővítmény alapja. Itt lehet meghatározni, hogy milyen jellegű hozzáférést kér a bővítmény a böngészőtől. Látható, hogy egy "content script"-et futtat le minden alkalommal, ha a facebook.com-ot megnyitod. Tehát nem tárol semmilyen adatot, és végképp nem küld nekem adatokat titokban. További olvasás a chrome extension-ekről az alábbi [linken](https://developer.chrome.com/docs/extensions/mv3/manifest/) lehet.
- A content_script.js egy egyszerű parancsot tartalmaz. Minden 1000 milliszekundban keresd meg az összes olyan HTML elemet, ami tartalmaz "Neked javasoltak" szöveget és ezeknek a gyökér elemének (a sok .parentNode visz el a gyökérhez) a stílusában állítsa láthatatlanra.

### Telepítés

1. Tömörített mappa letöltése
2. Kicsomagolás egy helyre, ahol bármikor elérhető
3. Hozzáadás a Chrome böngészőhöz

Hajrá!