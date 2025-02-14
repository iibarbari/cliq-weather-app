import Container from '@/components/Container';
import Section from '@/components/Section';
import FormGroup from '../components/FormGroup';
import Label from '@/components/Label';
import Input from '@/components/Input';

export default function Home() {
  return (
    <>
      <Section style={{ minHeight: '20vh', display: 'flex', alignItems: 'center' }}>
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
      </Section>
    </>
  );
}
