interface BookDto {
  name:         string;
  author:       string;
  description:  string;
  bookshelfId:  number;
  customerId:   number | null;
}

export default BookDto;
