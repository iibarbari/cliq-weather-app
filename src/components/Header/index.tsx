import Link from 'next/link';
import Container from '@/components/Container';
import styles from './Header.module.css';
import { JSX, PropsWithoutRef } from 'react';
import classNames from 'classnames';

type HeaderProps = Omit<PropsWithoutRef<JSX.IntrinsicElements["header"]>, "children">

export default function Header({ className, ...props }: HeaderProps) {
  return (
    <header {...props} className={classNames(styles.header, className)}>
      <nav>
        <Container>
          <Link className={styles.brand} href="/">React Weather</Link>
        </Container>
      </nav>
    </header>
  );
}
