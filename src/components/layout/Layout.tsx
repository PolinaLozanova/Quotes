import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
