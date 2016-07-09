const getUserFullName = (user) => user.firstName + ' ' + user.lastName;

const sortStringsAscending = (string1, string2) => {
  if (string1 < string2) return -1;
  if (string1 > string2) return 1;
  return 0;
};

export const sortTeamsByName = (team1, team2) => sortStringsAscending(team1.name, team2.name);

export const sortConferencesByName = (conference1, conference2) => sortStringsAscending(conference1.name, conference2.name);

export const sortUsersByName = (user1, user2) => sortStringsAscending(getUserFullName(user1), getUserFullName(user2));

export default {
  sortUsersByName: sortUsersByName,
  sortTeamsByName: sortTeamsByName,
  sortConferencesByName: sortConferencesByName
};
