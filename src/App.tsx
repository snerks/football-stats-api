import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PointsLineChart, { PointsPerYear } from './components/points-line-chart';
import { FootballScoresMatchListData, TournamentDatesWithEvents, Event, Team } from './models/football-scores-match-list';
import { AbbrLink, SportsTableData } from './models/sports-table-data';

type TeamNameInfo = {
  linkText: string;
  fullName: string;
}

// const competitionNameFull = "Championship";
// const competitionName = "championship";
// const teamNameFull = "Bristol City";
// const teamName = "bristol-city";

const defaultTeamNameInfo: TeamNameInfo = {
  linkText: "bristol-city",
  fullName: "Bristol City"
};

// const teamNameInfo: TeamNameInfo = defaultTeamNameInfo;

function App() {
  const getEventPoints = (event: Event) => {
    const team: Team = event.homeTeam.name.full === selectedTeamNameInfoItem.fullName ? event.homeTeam : event.awayTeam;

    const points = team.eventOutcome === "loss" ? 0 : team.eventOutcome === "win" ? 3 : 1;

    return points;
  }

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

  // teamNameLinkTextItems
  const [teamNameLinkTextItems, setTeamNameLinkTextItems] = useState<
    (string | undefined)[] | []
  >([]);

  const [teamNameInfoItems, setTeamNameInfoItems] = useState<
    (TeamNameInfo | undefined)[] | []
  >([]);

  const [selectedTeamNameInfoItem, setSelectedTeamNameInfoItem] = useState<
    TeamNameInfo
  >(defaultTeamNameInfo);

  const [loading, setLoading] = useState<
    boolean
  >(false);

  // // https://push.api.bbci.co.uk/batch?t=/data/bbc-morph-sport-tables-data/competition/championship/sport/football/version/2.0.2?timeout=5
  useEffect(() => {
    const fetchSportsTableData = async () => {
      const pointsPerYear: PointsPerYear = {};

      const competitionNames = [
        "premier-league",
        "championship",
        "league-one",
        "league-two",
      ];

      const allTeamNameAbbrLinks: (AbbrLink | undefined)[] = [];
      const allTeamNameLinkTextItems: (string | undefined)[] = [];

      for (let competitionNameIndex = 0; competitionNameIndex < competitionNames.length; competitionNameIndex++) {
        const competitionName = competitionNames[competitionNameIndex];
        const url = `https://push.api.bbci.co.uk/batch?t=/data/bbc-morph-sport-tables-data/competition/${competitionName}/sport/football/version/2.0.2?timeout=5`;

        const responseJson = await fetch(url);
        const responseSportsTableData: SportsTableData = await responseJson.json();
        const teamRows = responseSportsTableData?.payload[0].body.sportTables.tables[0].rows;

        const teamNameAbbrLinks = teamRows.map(teamRow => teamRow.cells[2].td.abbrLink); // .filter(i => i !== undefined);
        const teamNameLinkTextItems = teamNameAbbrLinks.map(teamNameAbbrLink => teamNameAbbrLink!.link.split("/").slice(-1)[0]);

        allTeamNameAbbrLinks.push(...teamNameAbbrLinks);
        allTeamNameLinkTextItems.push(...teamNameLinkTextItems);
      }

      const allTeamNameInfoItems: (TeamNameInfo | undefined)[] = allTeamNameAbbrLinks.map(teamNameAbbrLink => {
        if (teamNameAbbrLink === undefined) {
          return undefined;
        }

        const linkText = teamNameAbbrLink.link.split("/").slice(-1)[0];

        return {

          linkText,
          fullName: teamNameAbbrLink.text
        }
      });

      allTeamNameLinkTextItems.sort();
      setTeamNameLinkTextItems(allTeamNameLinkTextItems);

      const allTeamNameInfoItemsDefined = allTeamNameInfoItems.filter(i => i !== undefined);

      allTeamNameInfoItemsDefined.sort((a: TeamNameInfo | undefined, b: TeamNameInfo | undefined) => {
        if (a === undefined) {
          return 0;
        }

        if (b === undefined) {
          return 0;
        }

        if (a.fullName < b.fullName) {
          return -1;
        }
        if (a.fullName > b.fullName) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

      setTeamNameInfoItems(allTeamNameInfoItemsDefined);

      // setPointsPerYear(pointsPerYear);

      // setLoading(false);
    };

    fetchSportsTableData();

  }, []);

  useEffect(() => {
    const fetchMatchListData = async () => {
      setLoading(true);

      const pointsPerYear: PointsPerYear = {};

      const minimumYear = 2016;
      const maximumYear = 2021;

      for (let year = minimumYear; year <= maximumYear; year++) {
        const startDateISO = `${year}-08-01`;
        const endDateISO = `${year + 1}-07-31`;
        const todayISO = new Date().toISOString().substr(0, 10);

        const url = `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F${endDateISO}%2FstartDate%2F${startDateISO}%2Fteam%2F${selectedTeamNameInfoItem.linkText}%2FtodayDate%2F${todayISO}%2Fversion%2F2.4.6?timeout=5`;

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

        // setLeagueEvents(leagueEventsTemp);

        // setPoints2020(leagueEvents.map(le => getEventPoints(le)));
        pointsPerYear[year] = leagueEventsTemp.map(le => getEventPoints(le));
        pointsPerYear[year].unshift(0);
      }

      setPointsPerYear(pointsPerYear);

      setLoading(false);
    };

    fetchMatchListData();

  }, [selectedTeamNameInfoItem]);

  const handleSelectedTeamChange = (event: any) => {
    const linkText = event.target.value;
    const nextItem: TeamNameInfo = {
      linkText,
      fullName: teamNameInfoItems.find(i => i?.linkText == linkText)?.fullName || "NA"
    };

    setSelectedTeamNameInfoItem(nextItem);
  }

  return (
    <div>
      {
        teamNameLinkTextItems &&
        // <ul>
        //   {teamNameLinkTextItems.map(name => <li key={name}>{name}</li>)}
        // </ul>
        <div style={{ textAlign: "center" }}>
          <select name="teamNameInfoItems" id="teamNameInfoItems" onChange={handleSelectedTeamChange} style={{ fontSize: "20pt" }}>
            {/* <option value="volvo">Volvo</option> */}
            {teamNameInfoItems.map(i => <option key={i?.linkText || 1} value={i?.linkText} selected={i?.linkText == selectedTeamNameInfoItem.linkText}>{i?.fullName}</option>)}
          </select>
        </div>
      }
      {/* <pre>{JSON.stringify(selectedTeamNameInfoItem, null, 2)}</pre> */}

      {
        pointsPerYear && !loading &&
        <PointsLineChart
          pointsPerYear={pointsPerYear}
        />
      }

      {
        !pointsPerYear || loading &&
        // <p>
        //   Loading...
        // </p>
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "400px", border: "3px solid white" }}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
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
