import { _decorator, Component, Node, Mat4, input, EventKeyboard, KeyCode, Input, Vec2, Vec3, instantiate, resources, Prefab, SpriteFrame, director, Sprite, Camera, CameraComponent, game, Label } from 'cc';
import { Tile } from './Tile';
const { ccclass, property } = _decorator;


@ccclass('Game')
export class Game extends Component {
    public static gridWith:number=4;
    public static gridHeight:number=4;
    public static grid: Node[][] = Array.from({ length: Game.gridWith }, () =>
    Array.from({ length: Game.gridHeight }, () => null)
    );
    @property({type:Tile})
    GameModel:Tile

    start() {
        this.generateNewTile(2);
    }

   update() {
      
       this.checkGameOver();
       if(!this.checkGameOver()){
        input.on(Input.EventType.KEY_DOWN, this.CheckUserInput, this)
       }
    }

    CheckUserInput(event: EventKeyboard):void
    {
      this.prepareTile();
        switch(event.keyCode) {
            case KeyCode.ARROW_RIGHT:
             this.MoveAlltile(Vec3.RIGHT)
                
        }
         switch(event.keyCode) {
            case KeyCode.ARROW_LEFT:
            const leftDirection = new Vec3(-1, 0, 0);
            this.MoveAlltile(leftDirection)
        
        }

        switch(event.keyCode) {
            case KeyCode.ARROW_UP:
                this.MoveAlltile(Vec3.UP)
            }

        switch(event.keyCode) {
            case KeyCode.ARROW_DOWN:
                const down = new Vec3(0,-1, 0);
                this.MoveAlltile(down)
        }
    }

    MoveAlltile(direction: Vec3): void {
        let tilesMoveCount: number = 0;
        const leftDirection = new Vec3(-1, 0, 0);
        let preNum: number = Object.assign(tilesMoveCount,tilesMoveCount);
        console.log(preNum);
        console.log(tilesMoveCount);
        if (direction.equals(leftDirection)) {
          for (let x = 0; x < Game.gridWith; x++) {
            for (let y = 0; y < Game.gridHeight; y++) {
              if (Game.grid[x][y] != null) {
                if (this.Movetile(Game.grid[x][y], direction)) {
                    tilesMoveCount++;
                }
              }
            }
          }
        }
        if (direction.equals(Vec3.RIGHT)) {
          for (let x = Game.gridWith - 1; x >= 0; x--) {
            for (let y = 0; y < Game.gridHeight; y++) {
              if (Game.grid[x][y] != null) {
                if (this.Movetile(Game.grid[x][y], direction)) {
                    tilesMoveCount++;
                }
              }
            }
          }
        }
        const down = new Vec3(0,-1, 0);
        if (direction.equals(down)) {
            for (let x = 0; x <Game.gridWith; x++) {
              for (let y = 0; y < Game.gridHeight; y++) {
                if (Game.grid[x][y] != null) {
                  if (this.Movetile(Game.grid[x][y], direction)) {
                      tilesMoveCount++;
                  }
                }
              }
            }
        }
          
          if (direction.equals(Vec3.UP)) {
            for (let x = 0; x<Game.gridWith; x++) {
              for (let y = Game.gridHeight-1; y >=0 ; y--) {
                if (Game.grid[x][y] != null) {
                  if (this.Movetile(Game.grid[x][y], direction)) {
                      tilesMoveCount++;
                  }
                }
              }
            }
          }
          
          console.log(tilesMoveCount);
          if(tilesMoveCount!=preNum){
          this.generateNewTile(1)
          }
      }
    checkGameOver():boolean{
        if(this.node.children.length<Game.gridWith*Game.gridHeight)
        {
          return false
        }
        for(let x=0;x<Game.gridWith;x++){
          for(let y=0;y<Game.gridHeight;y++){
            let currentTile:Node =Game.grid[x][y];
            let tileBelow:Node=null;
            let tileBeside:Node=null;
            if(y!=0){
              tileBelow=Game.grid[x][y-1]
            }
            if(x!=Game.gridWith-1){
              tileBeside=Game.grid[x+1][y]
            }
            if(tileBeside!=null){
                if(currentTile.getComponent(Tile).tileValue==tileBeside.getComponent(Tile).tileValue){
                    return false;
                }
            }
            if(tileBelow!=null){
              if(currentTile.getComponent(Tile).tileValue==tileBelow.getComponent(Tile).tileValue){
                return false
              }
            }
          }
        }
        return true;
    }
    Movetile(tile:Node, direction:Vec3){
        let startPos: Vec3 = tile.position.clone();
        while (true){
            tile.position=tile.position.add(direction);
            const pos:Vec3=tile.position
            if(this.checkIsGrid(pos)){
              if(this.checkIsAtValidPosion(pos)){    
              this.updateGrid();
              }else{
                if(!this.CheckAndCombineTiles(tile)){
                   tile.position = tile.position.subtract(direction);
                   if(tile.position===startPos){
                      return false;
                   }else{
                    return true;
                   }
                }
                }
            }else{
              tile.position = tile.position.subtract(direction);
                if(tile.position===startPos){
                    return false;
                }else{
                    return true;
                }
            }
        } 
    }
    generateNewTile(howmany:number):void
    {
        for (let i = 0; i < howmany; ++i) {
             const location: Vec3 = this.getRandom();
            const instance = instantiate(this.GameModel.Tile_2) ;
            instance.parent = director.getScene();
            instance.parent = this.node;
            instance.setPosition(location);
              }
       this.updateGrid();
    }

    updateGrid():void
    {
        for (let y = 0; y < Game.gridWith; ++y) {
            for (let x = 0; x < Game.gridHeight; x++) {
                if (Game.grid[x][y] != null) {
                    if (Game.grid[x][y].parent == this.node) {
                        Game.grid[x][y] = null;
                    }
                }
            }
        }
    
        for (let tile of  this.node.children) {
            let v = new Vec3(Math.round(tile.position.x),Math.round( tile.position.y));
             Game.grid[v.x][v.y]=tile;
            
        }
    }

    checkIsGrid(pos: Vec3): boolean {
        if(pos.x>=0 &&pos.x<=Game.gridWith-1&&pos.y>=0&&pos.y<=Game.gridHeight-1){
            return true
        }
        return false;
    }

    checkIsAtValidPosion(pos:Vec3):boolean{
        if(Game.grid[pos.x][pos.y]==null){
        return true;
        }
        return false;
    }

    getRandom(): Vec3 {
      const availablePositions: Vec3[] = [];
      for (let i = 0; i < Game.gridWith; i++) {
        for (let j = 0; j < Game.gridHeight; j++) {
          if (Game.grid[i][j] == null) {
            availablePositions.push(new Vec3(i, j));
          }
        }
      }
      
      // Shuffle the array using Fisher-Yates shuffle
      for (let i = availablePositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
      }
      
      // Return the first element of the shuffled array
      return availablePositions[0];
    }

    CheckAndCombineTiles(movingTile:Node):boolean
    {
      const pos:Vec3=movingTile.position;
      const collidingTile:Node=Game.grid[pos.x][pos.y];
      let movingTileValue:Number=movingTile.getComponent(Tile).tileValue;
      let collidingTileValue:Number=collidingTile.getComponent(Tile).tileValue;
      if(movingTileValue==collidingTileValue&&!movingTile.getComponent(Tile).mergedThisTurn&&!collidingTile.getComponent(Tile).mergedThisTurn)
      {
        movingTile.destroy();
        collidingTile.destroy();
        Game.grid[pos.x][pos.y]=null;

        const values = [2, 4, 8, 16,32,64,128,256,512,1024,2048];
        for (let i = 0; i < values.length - 1; i++) {
          if (collidingTileValue === values[i]) {
            const NewTile = instantiate(this.GameModel[`tile_${values[i+1]}`]);
            NewTile.position = pos;
            NewTile.parent = this.node;
            NewTile.getComponent(Tile).mergedThisTurn = true;
            this.updateGrid();
            return true;
          }
        }     
        return false;
        
      }
    }


    prepareTile(): void {
      for (let t of  this.node.children){
       t.getComponent(Tile).mergedThisTurn=false;
      };
    }


    // public  PlayAgain() :void
    // {
    //     var grid =new Mat4[Game.gridWith,Game.gridHeight]

    // }


}

