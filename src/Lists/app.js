
import RegularList from '../Lists/List';
import SmallListItem from '../Lists/smallList';
import LargeListItem from '../Lists/LargeListItems';
const listItems = [
    {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
      "postId": 1,
      "id": 2,
      "name": "quo vero reiciendis velit similique earum",
      "email": "Jayne_Kuhic@sydney.com",
      "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    {
      "postId": 2,
      "id": 6,
      "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
      "email": "Presley.Mueller@myrl.com",
      "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
    },
    {
      "postId": 2,
      "id": 7,
      "name": "repellat consequatur praesentium vel minus molestias voluptatum",
      "email": "Dallas@ole.me",
      "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
      "postId": 2,
      "id": 8,
      "name": "et omnis dolorem",
      "email": "Mallory_Kunze@marie.org",
      "body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
    },
    {
      "postId": 2,
      "id": 9,
      "name": "provident id voluptas",
      "email": "Meghan_Littel@rene.us",
      "body": "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"
    },
    {
      "postId": 2,
      "id": 10,
      "name": "eaque et deleniti atque tenetur ut quo ut",
      "email": "Carmen_Keeling@caroline.name",
      "body": "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis"
    },
    {
      "postId": 6,
      "id": 27,
      "name": "doloribus quibusdam molestiae amet illum",
      "email": "Francesco.Gleason@nella.us",
      "body": "nisi vel quas ut laborum ratione\nrerum magni eum\nunde et voluptatem saepe\nvoluptas corporis modi amet ipsam eos saepe porro"
    },
    {
      "postId": 7,
      "id": 32,
      "name": "dolorem architecto ut pariatur quae qui suscipit",
      "email": "Maria@laurel.name",
      "body": "nihil ea itaque libero illo\nofficiis quo quo dicta inventore consequatur voluptas voluptatem\ncorporis sed necessitatibus velit tempore\nrerum velit et temporibus"
    },
    {
      "postId": 7,
      "id": 33,
      "name": "voluptatum totam vel voluptate omnis",
      "email": "Jaeden.Towne@arlene.tv",
      "body": "fugit harum quae vero\nlibero unde tempore\nsoluta eaque culpa sequi quibusdam nulla id\net et necessitatibus"
    }] 

export default function List(){
    return (<><RegularList items={listItems} resourceType='person' component={SmallListItem} />
        <RegularList items={listItems} resourceType='person' component={LargeListItem} /></>)
}