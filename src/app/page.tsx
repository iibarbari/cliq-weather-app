import Container from '@/components/Container';
import FormGroup from '../components/FormGroup';
import Label from '@/components/Label';
import Input from '@/components/Input';
import styles from "./page.module.css";
import Button from '@/components/Button';

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

      <section className={styles["weather-summary-section"]}>
        <Container>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Amsterdam, NL</h3>

            <div className={styles["degree-wrapper"]}>
              <p className={styles.degree}>7°</p>
            </div>
            <p>Thursday, light rain</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
