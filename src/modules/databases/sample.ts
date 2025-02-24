export const ADMIN_ROLE = "ADMIN";
export const USER_ROLE = "USER";

export const INIT_PERMISSIONS = [
    // Existing permissions
    {
        "_id": "648ab6d3fa16b294212e4033",
        "permission_name": "Create User",
        "permission_apiPath": "/api/v1/users",
        "permission_method": "POST",
        "permission_module": "USERS",
    },
    {
        "_id": "648ab6e7fa16b294212e4038",
        "permission_name": "Get User by Id",
        "permission_apiPath": "/api/v1/users/find-by-id/:id",
        "permission_method": "GET",
        "permission_module": "USERS",
    },
    {
        "_id": "648ab6e7fa16b294212e4039",
        "permission_name": "Add Partner",
        "permission_apiPath": "/api/v1/users/add-partner",
        "permission_method": "PATCH",
        "permission_module": "USERS",
    },
    {
        "_id": "648ab6e7fa16b294212e4040",
        "permission_name": "Get Partner",
        "permission_apiPath": "/api/v1/users/partner",
        "permission_method": "GET",
        "permission_module": "USERS",
    },
    {
        "_id": "648ab6e7fa16b294212e4041",
        "permission_name": "Update My Info",
        "permission_apiPath": "/api/v1/users/update-my-info",
        "permission_method": "PATCH",
        "permission_module": "USERS",
    },
    {
        "_id": "648ab6e7fa16b294212e4042",
        "permission_name": "Get My Info",
        "permission_apiPath": "/api/v1/users/get-my-info",
        "permission_method": "GET",
        "permission_module": "USERS",
    },
    // Plans permissions
    {
        "_id": "648ad720dafdb9754f40b8bb",
        "permission_name": "Create Plan",
        "permission_apiPath": "/api/v1/plans",
        "permission_method": "POST",
        "permission_module": "PLANS",
    },
    {
        "_id": "648ad740dafdb9754f40b8bf",
        "permission_name": "Get Plan By Id",
        "permission_apiPath": "/api/v1/plans/:id",
        "permission_method": "GET",
        "permission_module": "PLANS",
    },
    {
        "_id": "648ad740dafdb9754f40b8c0",
        "permission_name": "Get My Plan List",
        "permission_apiPath": "/api/v1/plans",
        "permission_method": "GET",
        "permission_module": "PLANS",
    },
    // Activities permissions
    {
        "_id": "648ad622dafdb9754f40b89f",
        "permission_name": "Create Activity",
        "permission_apiPath": "/api/v1/activities",
        "permission_method": "POST",
        "permission_module": "ACTIVITIES",
    },
    {
        "_id": "648ad630dafdb9754f40b8a6",
        "permission_name": "Get Activities by Plan",
        "permission_apiPath": "/api/v1/activities/plan/:planId",
        "permission_method": "GET",
        "permission_module": "ACTIVITIES",
    },
    {
        "_id": "648ad630dafdb9754f40b8a7",
        "permission_name": "Create Many Activities",
        "permission_apiPath": "/api/v1/activities/many",
        "permission_method": "POST",
        "permission_module": "ACTIVITIES",
    },
    {
        "_id": "648ad630dafdb9754f40b8a8",
        "permission_name": "Update Many Activities",
        "permission_apiPath": "/api/v1/activities/many",
        "permission_method": "PATCH",
        "permission_module": "ACTIVITIES",
    },
    // Post permissions
    {
        "_id": "648ad750dafdb9754f40b8d1",
        "permission_name": "Create Post",
        "permission_apiPath": "/api/v1/post",
        "permission_method": "POST",
        "permission_module": "POSTS",
    },
    {
        "_id": "648ad750dafdb9754f40b8d5",
        "permission_name": "Like Post",
        "permission_apiPath": "/api/v1/post/like",
        "permission_method": "PATCH",
        "permission_module": "POSTS",
    },
    {
        "_id": "648ad750dafdb9754f40b8d6",
        "permission_name": "Unlike Post",
        "permission_apiPath": "/api/v1/post/unlike",
        "permission_method": "PATCH",
        "permission_module": "POSTS",
    },
    // Report Support permissions
    {
        "_id": "648ad750dafdb9754f40b8d2",
        "permission_name": "Create Report Support",
        "permission_apiPath": "/api/v1/report-support",
        "permission_method": "POST",
        "permission_module": "REPORT-SUPPORT",
    },
    {
        "_id": "648ad750dafdb9754f40b8d3",
        "permission_name": "Get Popular Posts",
        "permission_apiPath": "/api/v1/report-support",
        "permission_method": "GET",
        "permission_module": "REPORT-SUPPORT",
    }
];

export const USER_PERMISSION_IDS = [
    // Existing permissions
    "648ad720dafdb9754f40b8bb",
    "648ad730dafdb9754f40b8be",
    "648ad622dafdb9754f40b89f",
    "648ad630dafdb9754f40b8a6",
    "648ad740dafdb9754f40b8bf",
    "648ab6e7fa16b294212e4039",
    "648ab6e7fa16b294212e4040",
    "648ad740dafdb9754f40b8c0",
    "648ab6e7fa16b294212e4041",
    "648ab6e7fa16b294212e4042",
    "648ad750dafdb9754f40b8d1",
    "648ad750dafdb9754f40b8d5",
    "648ad750dafdb9754f40b8d6",
    "648ad630dafdb9754f40b8a7",
    "648ad630dafdb9754f40b8a8"
];