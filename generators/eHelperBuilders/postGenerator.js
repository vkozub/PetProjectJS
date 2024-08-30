

exports.PostGenerator = class PostGenerator {
    constructor(postParams, page, testInfo) {
        this.postParams = postParams;
        this.page = page;
        this.testInfo = testInfo;
    }

    setPayload(user) {
        const userParams = { 
            userId: user.email,
            userName: user.userName
        };
        this.payload = Object.assign({}, this.postParams, { countPosts: 1 }, userParams)
    }

    async generatePost(user) {
        // Set payload with user data
        this.setPayload(user);
        // generate post by api
        const response = await this.page.request.post(this.testInfo.project.use.config.baseUrl + '/api/users/post', {
            data: this.payload
        });
        const responseJson = await response.json();
        this.payload.id = responseJson?.savedPost?._id;

        return this.payload;
    }

}
