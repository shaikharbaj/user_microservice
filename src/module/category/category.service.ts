import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor(private readonly prisma: PrismaService) { }

    async fetchAllCategory() {
        try {
            const data = await this.prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                    status: true,
                    subCategory: {
                        select: {
                            id: true,
                            name: true,
                            status: true,
                        }
                    }
                },
                where: {
                    parentId: null
                }

            });
            return { status: true, message: "all category fetch successfully", data };
        } catch (error) {
            console.log(error);
            throw new RpcException(error);
        }
    }

    async findCategoryByCondition(condition: any, select: any) {
        console.log(select);
        const category = await this.prisma.category.findFirst({
            select,
            where: condition
        })
        return category;
    }

    async createCategory(payload: any) {
        try {
            //check category is already present or not........
            //  check it has parent_id is present or not
            const select: any = {
                    id: true,
                    name: true,
                    slug: true,
                    status: true,
                    parentId: true,
                    createdAt: true,
                    updatedAt: true
                }
            if (payload?.parentId) {
                //check category is present_or_not_
                select['parent']=true;
                const categorypresentCondition: any = { id: Number(payload?.parentId) }
                const checkiscategoryispresent = await this.findCategoryByCondition(categorypresentCondition, select);

                if (!checkiscategoryispresent) {
                    throw new RpcException("category is not present with this id");
                }

                //check subcategory is present or not.........
                const condition: any = {
                    parentId: payload?.parentId,
                    name: payload.name
                }
                console.log(select);
                const checkissubcategoryispresent = await this.findCategoryByCondition(condition, select);
                if (checkissubcategoryispresent) {
                    throw new RpcException("subcategory is already exist");
                }

                //create the new subcategory.......
                const newsubcategory = await this.prisma.category.create({
                    select,
                    data: {
                        name: payload?.name,
                        parentId: payload?.parentId,
                        status: payload?.status,
                        slug: payload?.slug
                    }
                })

                return { status: true, message: "subcategory created successfully", data: newsubcategory };
            } else {
                //check category is present or not......
                const condition: any = {
                    parentId: null,
                    name: payload.name
                }
                const checkiscategoryispresent = await this.findCategoryByCondition(condition, select);
                if (checkiscategoryispresent) {
                    throw new RpcException("category is already present");
                }
                //create category.....
                const user = await this.prisma.category.create({
                    select,
                    data: {
                        name: payload.name,
                        slug: payload.slug,
                        status: payload.status
                    }
                })

                return { status: true, message: "category created successfully", data: user };
            }

        } catch (error) {
            console.log(error.message);
            throw new RpcException(error);
        }
    }

    async fetchAllActiveCategory() {
        try {
            const ActiveCategory = await this.prisma.category.findMany({
                include: {
                    subCategory: true
                },
                where: {
                    status: true,
                    parentId: null
                }
            })
            return { status: true, message: "all active categories fetch successfully", data: ActiveCategory }
        } catch (error) {
            console.log(error.message);
            throw new RpcException(error);
        }
    }

    async fetchcategorybyId(id: number) {
        try {
            //checkcategorywiththis id is present or not
            const select: any = {
                id: true,
                name: true,
                slug: true,
                status: true,
                parentId: true,
                createdAt: true,
                updatedAt: true,
                subCategory: true
            }
            const checkiscategoryispresent = await this.findCategoryByCondition({ id: +id }, select)
            if (!checkiscategoryispresent) {
                throw new RpcException("category with this id is not found");
            }
            return { status: true, message: "category fetch successfully", data: checkiscategoryispresent }
        } catch (error) {
            console.log(error.message);
            throw new RpcException(error);
        }
    }

    // async updateCategory(id: number, data: any) {
    //     try {
             
    //     } catch (error) {
    //         console.log(error.message);
    //         throw new RpcException(error);
    //     }
    // }
}
