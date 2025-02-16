import Container from '@/components/Container';
import styles from "./page.module.css";
import CurrentWeather from '../components/CurrentWeather';
import FiveDayForecast from '../components/FiveDayForecast';
import CitySearch from '@/components/CitySearch';
import UserLocationContextProvider from '@/components/UserLocationContextProvider';
import DailyEvolution from '@/components/DailyEvolution';

export default function Home() {

  return (
    <div className={styles.page}>
      <UserLocationContextProvider>
        <section className={styles["city-name-form-section"]}>
          <Container>
            <CitySearch />
          </Container>
        </section>

        <section className={styles.dark}>
          <Container>
            <CurrentWeather />
          </Container>
        </section>

        <section>
          <Container>
            <FiveDayForecast />
          </Container>
        </section>

        <section className={styles.dark}>
          <Container>
            <DailyEvolution />
          </Container>
        </section>
      </UserLocationContextProvider>
    </div>
  );
}
