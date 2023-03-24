import { _decorator, Component, Node, CCInteger, CCBoolean, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
@property({type:CCInteger})
tileValue:number
@property({type:CCBoolean})
mergedThisTurn:boolean


@property({type:Prefab})
private tile_2:Prefab

public get Tile_2() : Prefab {
    return this.tile_2
}
 
public set value(v : Prefab) {
    this.tile_2 = v;
}

@property({type:Prefab})
private tile_4:Prefab

public get Tile_4() : Prefab {
    return this.tile_4
}
 
public set value4(v : Prefab) {
    this.tile_4 = v;
}


@property({type:Prefab})
private tile_8:Prefab

public get Tile_8() : Prefab {
    return this.tile_8
}
 
public set value8(v : Prefab) {
    this.tile_8 = v;
}


@property({type:Prefab})
private tile_16:Prefab

public get Tile_16() : Prefab {
    return this.tile_16
}
 
public set value16(v : Prefab) {
    this.tile_16 = v;
}


@property({type:Prefab})
private tile_32:Prefab

public get Tile_32() : Prefab {
    return this.tile_32
}
 
public set value32(v : Prefab) {
    this.tile_32= v;
}

@property({type:Prefab})
private tile_64:Prefab

public get Tile_64() : Prefab {
    return this.tile_64
}
 
public set value2(v : Prefab) {
    this.tile_64 = v;
}


@property({type:Prefab})
private tile_128:Prefab

public get Tile_128() : Prefab {
    return this.tile_128
}
 
public set value128(v : Prefab) {
    this.tile_128 = v;
}

@property({type:Prefab})
private tile_256:Prefab

public get Tile_256() : Prefab {
    return this.tile_256
}
 
public set value256(v : Prefab) {
    this.tile_256 = v;
}


@property({type:Prefab})
private tile_512:Prefab

public get Tile_512() : Prefab {
    return this.tile_512
}
 
public set value512(v : Prefab) {
    this.tile_512 = v;
}

@property({type:Prefab})
private tile_1024:Prefab

public get Tile_1024() : Prefab {
    return this.tile_1024
}
 
public set value1024(v : Prefab) {
    this.tile_1024 = v;
}

@property({type:Prefab})
private tile_2048:Prefab

public get Tile_2048() : Prefab {
    return this.tile_2048
}
 
public set value2048(v : Prefab) {
    this.tile_2048 = v;
}

}


