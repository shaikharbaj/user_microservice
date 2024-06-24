import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern } from '@nestjs/microservices';
import { Data } from 'src/common/decorators/data.decorator';
import { ID } from 'src/common/decorators/id.decorator';
import { createCategoryDTO } from './dto/createcategory.dto';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }


    @MessagePattern({ role: "FETCH-ALL-CATEGORY", cmd: "fetch-all-category" })
    async fetchAllCategory() {
        console.log("hiii");
        return await this.categoryService.fetchAllCategory();
    }

    @MessagePattern({ role: "CREATE-CATEGORY", cmd: "create-category" })
    async createCategory(@Data() data: createCategoryDTO) {
        return await this.categoryService.createCategory(data);
    }

    @MessagePattern({ role: "FETCH-ALL-ACTIVE_CATEGORY", cmd: "fetch-all-active-category" })
    async fetchAllActiveCategory() {
        return await this.categoryService.fetchAllActiveCategory();
    }

    @MessagePattern({role:"Fetch-Category-By-Id",cmd:"fetch-category-by-id"})
    async fetchCategoryById(@ID() id:number){
            return await this.categoryService.fetchcategorybyId(id);
    }

    // @MessagePattern({role:"UPDATE_CATEGORY",cmd:"update-category"})
    // async updateCategory(@ID() id:number,@Data() data:any){
    //        return await this.categoryService.updateCategory(id,data);
    // }
}
