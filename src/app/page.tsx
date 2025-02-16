import Container from '@/components/Container';
import styles from "./page.module.css";
import CurrentWeather from '../components/CurrentWeather';
import FormGroup from '@/components/FormGroup';
import Label from '@/components/Label';
import Input from '@/components/Input';
import FiveDayForecast from '../components/FiveDayForecast';

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles["city-name-form-section"]}>
        <Container>
          <form>
            <fieldset>
              <FormGroup id="city">
                <Label>City Name</Label>

                <Input type="text" />
              </FormGroup>
            </fieldset>
          </form>
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
