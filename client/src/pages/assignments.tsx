import { Card, CardContent, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Assignment, Instrument, Musician } from './choosePlayers';
import { shuffle } from 'lodash';

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const router = useRouter();
  const { musicians, instruments } = router.query;
  const parsedMusicians = musicians ? JSON.parse(musicians as string) : [];
  const parsedInstruments = instruments
    ? JSON.parse(instruments as string)
    : [];
  const assign = (musicians: Musician[], instruments: Instrument[]) => {
    const shuffledNames = shuffle(
      musicians.filter((musician) => musician.selected)
    );
    const shuffledInstruments = shuffle(
      instruments.filter((instrument) => instrument.selected)
    );
    const nextAssignment = shuffledNames.map((name, i) => {
      return { name: name.name, instrument: shuffledInstruments[i].name };
    });
    console.log(nextAssignment);
    setAssignments(nextAssignment);
  };

  useEffect(() => {
    assign(parsedMusicians, parsedInstruments);
  }, []);
  return (
    <div>
      {assignments.map((assignment) => {
        return (
          <Card
            style={{ border: "solid pink", margin: ".25em", width: "50em" }}
            key={assignment.name}
          >
            <CardContent>
              <Typography>Name: {assignment.name}</Typography>
              <Typography>Instrument: {assignment.instrument}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
