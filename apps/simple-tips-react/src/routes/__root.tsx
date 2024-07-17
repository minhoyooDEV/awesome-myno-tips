import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { routeTree } from "../routeTree.gen";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  header: {},
  body: {
    padding: 16,
  },
});

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <ul {...stylex.props(styles.header)}>
          {[...Object.values(routeTree.children ?? {})]?.map((route) => (
            <Link
              key={route.path}
              to={route.to}
              className="[&.active]:font-bold"
            >
              <li>{route.path}</li>
            </Link>
          ))}
        </ul>
        <hr />
        <div {...stylex.props(styles.body)}>
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </>
    );
  },
});
