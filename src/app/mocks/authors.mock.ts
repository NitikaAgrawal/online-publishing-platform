import { Author } from "../interfaces/author";

export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Benjamin Foster',
    bio: 'Technology writer and blockchain enthusiast',
    email: 'benjamin@gmail.com',
    profilePicture: 'assets/author1.jpeg',
    joinDate: new Date('2022-01-10')
  },
  {
    id: '2',
    name: 'Anna Smith',
    bio: 'Economist and career advisor',
    email: 'annasmith@gmail.com',
    profilePicture: 'assets/author2.jpeg',
    joinDate: new Date('2021-11-15')
  },
  {
    id: '3',
    name: 'Anna Swamy',
    bio: 'Financial advisor',
    email: 'annaswamy@gmail.com',
    profilePicture: 'assets/author3.jpeg',
    joinDate: new Date('2019-01-15')
  },
  {
    id: '4',
    name: 'Pratik Bagadiya',
    bio: 'Technology writer and blockchain enthusiast',
    email: 'pratik01@gmail.com',
    profilePicture: 'assets/author4.jpeg',
    joinDate: new Date('2019-01-05')
  },
  {
    id: '5',
    name: 'Amrita Singh',
    bio: 'Economist and career advisor',
    email: 'amrita@gmail.com',
    profilePicture: 'assets/author5.jpeg',
    joinDate: new Date('2015-11-25')
  },
  {
    id: '6',
    name: 'Shashank Vishwakarma',
    bio: 'Financial advisor',
    email: 'shashank@gmail.com',
    profilePicture: 'assets/author6.jpeg',
    joinDate: new Date('2020-01-10')
  },
];