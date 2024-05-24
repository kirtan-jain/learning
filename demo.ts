
type ExtractPII<T> = {
    [Prop in keyof T]: T[Prop] extends {pii: true} ? true : false;
}

type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
  };
   
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;

type EventConfig<T extends {kind: string}> = {
    [E in T as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
  

type RemoveKindField<T> = {
    [Prop in keyof T as Exclude<Prop,"kind">]: T[Prop]
}

interface Circle {
    kind: "circle";
    radius: number;
}
 
type KindlessCircle = RemoveKindField<Circle>;


type CreateMutable<T> = {
    -readonly [Prop in keyof T]: T[Prop]
}

type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };
   
type UnlockedAccount = CreateMutable<LockedAccount>;
             