import { Component } from "@angular/core";

const numberOfRows = 5;
const numberOfColumns = 5;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  readonly rows = Array(numberOfRows)
    .fill(null)
    .map((_, i) => i);
  readonly columns = Array(numberOfColumns)
    .fill(null)
    .map((_, i) => i);

  startNode: [number, number] | null = null;
  endNode: [number, number] | null = null;

  createNode(x: number, y: number): [number, number] {
    return [x, y];
  }

  onNodeClick(x: number, y: number) {
    const node = this.createNode(x, y);

    if (!this.startNode) {
      this.startNode = node;
      this.setSurroundingStartNodes();
      return;
    }

    if (!!this.startNode && !this.endNode) {
      this.endNode = node;
      return;
    }

    if (!!this.startNode && !!this.endNode) {
      this.startNode = null;
      this.endNode = null;
      this.startNode = node;
      this.setSurroundingStartNodes();

      return;
    }
  }

  setSurroundingStartNodes() {
    const topNode = [this.startNode[0], this.startNode[1] - 1];
    const rightNode = [this.startNode[0] + 1, this.startNode[1]];
    const leftNode = [this.startNode[0] - 1, this.startNode[1]];
    const bottomNode = [this.startNode[0], this.startNode[1] + 1];

    console.log("top node", topNode);
    console.log("left node", leftNode);
    console.log("right node", rightNode);
    console.log("bottom node", bottomNode);
  }

  onClearStartAndEndNodes() {
    this.startNode = null;
    this.endNode = null;
  }

  isStartNode(x: number, y: number) {
    return (
      !!this.startNode && this.startNode[0] === x && this.startNode[1] === y
    );
  }

  isEndNode(x: number, y: number) {
    return !!this.endNode && this.endNode[0] === x && this.endNode[1] === y;
  }
}
