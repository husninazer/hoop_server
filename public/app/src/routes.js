import { routes as home } from './home'
import { routes as hotel } from './hotel'
import { routes as flights } from './flights'
import { routes as review} from './review'
import { routes as agent} from './agent'
import { routes as login} from './login'
import { routes as bank } from './bank'
import { routes as reports } from './reports'
import { routes as admin } from './admin'

export default  [
    // ...home,
    // ...hotel,
    // ...flights,
    // ...review,
    // ...bank,
    ...agent,
    ...login,
    ...reports,
    ...admin
]