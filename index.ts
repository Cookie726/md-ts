enum HEADING_TYPE {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
}

type StateType = Record<string, any>

type InitState = {
    '#': One
}

type One = {
    '#': Two,
    ' ': HEADING_TYPE.H1
}

type Two = {
    '#': Three,
    ' ': HEADING_TYPE.H2
}

type Three = {
    '#': Four,
    ' ': HEADING_TYPE.H3
}

type Four = {
    '#': Five,
    ' ': HEADING_TYPE.H4
}

type Five = {
    '#': Six,
    ' ': HEADING_TYPE.H5
}

type Six = {
    ' ': HEADING_TYPE.H6
}

type Reject = false;

type Accept = {
    type: string
}

type Heading<Text extends string, Type extends HEADING_TYPE> = {
    type: Type,
    text: Paragraph<Text>
}

type Paragraph<Text extends string> = {
    type: 'p',
    text: Text
}

type Emphasis<Text extends string> = {
    type: 'emphasis'
    text: Paragraph<Text>
}

type Strong<Text extends string> = {
    type: 'strong'
    text: Paragraph<Text>
}

type CodeSpan = {
    type: 'code'
    text: string
}


type ParseHeading<S extends string> = S extends `${infer C}${infer Rest}` ? (C extends '#' ? HEADING_TYPE.H1 : Reject) : Reject;

type StateChange<Input extends String, State extends StateType = InitState, Stack extends string = ''> = Input extends `${infer C}${infer Rest}` ? (C extends keyof State ? (State[C] extends HEADING_TYPE ? Heading<Rest, State[C]> : StateChange<Rest, State[C], `${Stack}${C}`>) : Paragraph<`${Stack}${C}${Rest}`>) : Reject; 

type ParseCodeSpan<S extends string> = S extends `${infer Pre}\`${infer Code}\`${infer Rest}` ? true : Reject;

type b = StateChange<'##### ddd'>;