import Container from '@/components/Container';
import styles from "./page.module.css";
import CurrentWeather from '../components/CurrentWeather';
import FiveDayForecast from '../components/FiveDayForecast';
import CitySearch from '@/components/CitySearch';

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles["city-name-form-section"]}>
        <Container>
          <CitySearch />
        </Container>
      </section>

      <section className={styles.dark}>
        <Container>
          <CurrentWeather
            cityKey="1288697"
            cityName="Ankara"
            countryCode="TR"
            temperatureUnit="metric"
          />
        </Container>
      </section>

      <section>
        <Container>
          <FiveDayForecast
            cityKey="1288697"
            cityName="Ankara"
            countryCode="TR"
            temperatureUnit="metric"
          />
        </Container>
      </section>
    </div>
  );
}
