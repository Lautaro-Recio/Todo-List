export const TODO_FILTER = {
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed"
} as const

export const FULTERS_BUTTONS = {
    [TODO_FILTER.ALL]:{
        literal:"Todos",
        href:`/?filter=${TODO_FILTER.ALL}`
    },
    [TODO_FILTER.ACTIVE]:{
        literal:"Activos",
        href:`/?filter=${TODO_FILTER.ACTIVE}`
    },
    [TODO_FILTER.COMPLETED]:{
        literal:"Completados",
        href:`/?filter=${TODO_FILTER.COMPLETED}`
    },
    
}
// as const hace el archivo de solo lectura, funcionalidad de TS

export type values = typeof TODO_FILTER[keyof typeof TODO_FILTER]