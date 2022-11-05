# A Facebook "Neked javasoltak" bejegyzések és hirdetések elrejtése
## Chrome extension
Ez a böngésző bővítmény azok számára javasolt, akik úgy érzik nem ütik meg a kívánt színvonalat a "Neked javasoltak" bejegyzések és a hirdetések.

#### Fontos: mivel ez egy olyan bővítmény, ami a facebook hírfolyamodra lát rá és módosítja, javasolt a forráskód átnézése.

- A manifest.json fájl minden bővítmény alapja. Itt lehet meghatározni, hogy milyen jellegű hozzáférést kér a bővítmény a böngészőtől. Látható, hogy egy "content script"-et futtat le minden alkalommal, ha a facebook.com-ot megnyitod.
- A content_script.js másodpercenként kategorizálja az új hírfolyambejegyzéseket, és a "Neked javasoltak"-at és hirdetéseket láthatatlanná teszi. Itt érdemes megnézni, hogy nem küld el titokban adatokat, mivel nincs ["fetch()" függvény vagy XMLHttpRequest osztály](https://reqbin.com/code/javascript/wzp2hxwh/javascript-post-request-example) használatban.

### Telepítés

1. Tömörített mappa letöltése
![](letoltes.png)
2. Kicsomagolás egy helyre, ahol bármikor elérhető
![](kicsomagolas.png)
3. Hozzáadás a Chrome böngészőhöz
![](telepites.png)
![](telepites2.png)


Innentől csak frissíteni kell a facebook oldalad és kész is!
