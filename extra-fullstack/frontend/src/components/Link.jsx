import { NavLink } from "react-router"

import styles from './Link.module.css'

export function Link({ href, children, className, ...restOfProps }) {
    return(
        <NavLink to={href} {...restOfProps} className={`${styles.link} ${className ?? ''}`}>
            {children}
        </NavLink>
    )
}