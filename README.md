# A Facebook "Neked javasoltak" bejegyzések és hirdetések elrejtése
Ez a böngésző bővítmény azok számára javasolt, akik úgy érzik nem ütik meg a kívánt színvonalat a "Neked javasoltak" bejegyzések és a hirdetések.

#### Akit érdekel a forráskód:

- A [manifest.json](https://github.com/nazsombor/clear-fb-recommendation-chrome-extension/blob/main/manifest.json) fájl minden bővítmény alapja. Itt lehet meghatározni, hogy milyen jellegű hozzáférést kér a bővítmény a böngészőtől. Látható, hogy egy "content script"-et futtat le minden alkalommal, ha a facebook.com-ot megnyitod.
- A [content-script.js](https://github.com/nazsombor/clear-fb-recommendation-chrome-extension/blob/main/content-script.js) másodpercenként kategorizálja az új hírfolyambejegyzéseket, és a "Neked javasoltak"-at és hirdetéseket láthatatlanná teszi. Minden kód részlet mellett szöveges magyarázat van.

## Telepítés

1. A tömörített mappát a jobb felső sarokban lévő zöld Code bombbal lehet letölteni
2. Csomagold ki egy jó helyre pl. a Dokumentumokba
3. A Chrome böngésző jobb felső sarkában kattints az Extensions gombra, majd a Manage extensions gombra
4. Kapcsold be a jobb felső sarokban lévő Developer mode-ot
5. Kattints a Load unpacked gombra
6. Válaszd ki a clear-fb-recommendation-chrome-extension mappát

Innentől csak frissíteni kell a facebook oldalad és kész is!
