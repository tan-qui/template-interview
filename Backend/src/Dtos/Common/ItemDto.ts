

class ItemDto {
    id: number;
    code: any;
    name: any;
    status: any;
    constructor(item: ItemDto) {
        this.id = item.id;
        this.code = item.code;
        this.name = item.name;
        this.status = item.status;
    }
}

export default ItemDto;
