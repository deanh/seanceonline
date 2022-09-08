export class Tarot {
  suits: Array<string>;
  ranks: Array<string>;
  cardNames: Array<string>;

  private baseUri = "tarot/";
  private ext = ".jpg";

  constructor() {
    this.suits = ["wands", "coins", "swords", "cups"];
    this.ranks = [...Array(9).keys()]
      .map((i) => (i + 2).toString())
      .concat(["ace", "page", "knight", "queen", "king"]);

    // 0-21 for major arcana
    this.cardNames = [...Array(22).keys()].map((c) => c.toString());

    for (let s of this.suits) {
      this.cardNames = this.cardNames.concat(
        this.ranks.map((r) => s + "-" + r)
      );
    }
  }

  cardJpgUrl(name: string): string {
    return this.baseUri + name + ".jpg";
  }

  randomCardSlug() {
    const idx = Math.floor(Math.random() * this.cardNames.length);
    return this.cardNames[idx];
  }

  createNewCard(
    parent: HTMLElement,
    x: number = 0,
    y: number = 0
  ): HTMLImageElement {
    let img = new Image();
    let name = this.randomCardSlug();
    img.src = this.cardJpgUrl(name);
    img.className = "card";
    img.setAttribute('draggable', 'false');
    img.id = name;
    parent.appendChild(img);

    return img;
  }
}
