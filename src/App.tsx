import React, { useEffect, useState } from 'react';
import './App.css';
import PointsLineChart, { PointsPerYear } from './components/points-line-chart';
import { FootballScoresMatchListData, TournamentDatesWithEvents, Event, Team } from './models/football-scores-match-list';

const teamNameFull = "Bristol City";
const teamName = "bristol-city";

const getEventPoints = (event: Event) => {
  const team: Team = event.homeTeam.name.full === teamNameFull ? event.homeTeam : event.awayTeam;

  const points = team.eventOutcome === "loss" ? 0 : team.eventOutcome === "win" ? 3 : 1;

  return points;
}

function App() {

  // const [footballScoresMatchListData, setFootballScoresMatchListData] = useState<
  //   FootballScoresMatchListData | undefined
  // >(undefined);

  // const [tournamentDatesWithEvents, setTournamentDatesWithEvents] = useState<
  //   TournamentDatesWithEvents | undefined
  // >(undefined);

  const [leagueEvents, setLeagueEvents] = useState<
    Event[] | undefined
  >(undefined);

  // const [points2020, setPoints2020] = useState<
  //   number[]
  // >([]);

  const [pointsPerYear, setPointsPerYear] = useState<
    PointsPerYear | undefined
  >(undefined);

  useEffect(() => {
    const fetchMatchListData = async () => {
      const pointsPerYear: PointsPerYear = {};

      const minimumYear = 2016;
      const maximumYear = 2021;

      for (let year = minimumYear; year <= maximumYear; year++) {
        const url = `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F${year + 1}-07-31%2FstartDate%2F${year}-08-01%2Fteam%2F${teamName}%2FtodayDate%2F2021-08-15%2Fversion%2F2.4.6?timeout=5`;

        const responseJson = await fetch(url);
        const responseFootballScoresMatchListData: FootballScoresMatchListData = await responseJson.json();
        const tournamentDatesWithEvents = responseFootballScoresMatchListData?.payload[0].body.matchData[0].tournamentDatesWithEvents;

        // setFootballScoresMatchListData(responseFootballScoresMatchListData);
        // setTournamentDatesWithEvents(responseFootballScoresMatchListData?.payload[0].body.matchData[0].tournamentDatesWithEvents);

        const leagueEventsTemp: Event[] = [];

        const leagueNames = [
          "premier-league",
          "championship",
          "league-one",
          "league-two",
        ]

        if (tournamentDatesWithEvents) {
          responseFootballScoresMatchListData.payload[0].body.matchData.forEach(matchDataItem => {
            Object.keys(matchDataItem.tournamentDatesWithEvents).forEach(key => matchDataItem.tournamentDatesWithEvents[key][0].events.forEach(ev => {
              if (leagueNames.indexOf(ev.tournamentSlug) === -1 && ev.eventProgress.status === "RESULT") {
                console.warn(ev.tournamentSlug);
              }
              if (leagueNames.indexOf(ev.tournamentSlug) > -1 && ev.eventProgress.status === "RESULT") {
                leagueEventsTemp.push(ev);
              }
            }));
          });
        }

        leagueEventsTemp.sort((a: Event, b: Event) => {
          if (a.startTime < b.startTime) {
            return -1;
          }
          if (a.startTime > b.startTime) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });

        setLeagueEvents(leagueEventsTemp);

        // setPoints2020(leagueEvents.map(le => getEventPoints(le)));
        pointsPerYear[year] = leagueEventsTemp.map(le => getEventPoints(le));
        pointsPerYear[year].unshift(0);
      }

      setPointsPerYear(pointsPerYear);

      // setLoading(false);
    };

    fetchMatchListData();

  }, []);

  return (
    <div>
      {pointsPerYear &&
        <PointsLineChart
          pointsPerYear={pointsPerYear}
        />
      }

      <div>
        {/* {points2020 &&
          <pre>{JSON.stringify(points2020, null, 2)}</pre>
        } */}

        {/* <ul>
            {leagueEvents &&
              leagueEvents.map(leagueEvent => <li key={leagueEvent.startTime}>
                {new Date(leagueEvent.startTime).toDateString()} : {leagueEvent.homeTeam.name.full} {leagueEvent.homeTeam.scores.fullTime} v {leagueEvent.awayTeam.scores.fullTime} {leagueEvent.awayTeam.name.full} : Points = [{getEventPoints(leagueEvent)}]
              </li>)
            }
          </ul> */}
      </div>
    </div>
  );
}

export default App;
