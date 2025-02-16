import Container from "@/components/Container";
import styles from "./page.module.css";
import CurrentWeather from "../components/CurrentWeather";
import FiveDayForecast from "../components/FiveDayForecast";
import CitySearch from "@/components/CitySearch";
import UserLocationContextProvider from "@/components/UserLocationContextProvider";
import DailyEvolution from "@/components/DailyEvolution";
import classNames from "classnames";

export default function Home() {

  return (
    <div className={styles.page}>
      <UserLocationContextProvider>
        <section className={styles.city_name_form}>
          <Container>
            <CitySearch />
          </Container>
        </section>

        <section className={classNames(styles.dark, styles.current_weather)}>
          <Container>
            <CurrentWeather />
          </Container>
        </section>

        <section className={styles.five_day_forecast}>
          <Container>
            <FiveDayForecast />
          </Container>
        </section>

        <section className={classNames(styles.dark, styles.daily_evolution)}>
          <Container>
            <DailyEvolution />
          </Container>
        </section>
      </UserLocationContextProvider>
    </div>
  );
}
