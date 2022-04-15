import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

function Layout(props: any) {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
}

export default Layout;
