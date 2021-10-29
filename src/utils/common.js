import { useSelector } from "react-redux";

export const renderIcon = (name) => {
  //   const playstation = <ion-icon name="logo-playstation"></ion-icon>;
  //   const xbox = <ion-icon name="logo-xbox"></ion-icon>;
  //   const pc = <ion-icon name="logo-windows"></ion-icon>;

  switch (name) {
    case "pc":
      return <ion-icon name="logo-windows"></ion-icon>;
    case "xbox":
      return <ion-icon name="logo-xbox"></ion-icon>;
    case "playstation":
      return <ion-icon name="logo-playstation"></ion-icon>;

    default:
      return <ion-icon name="help-outline"></ion-icon>;
  }
};
