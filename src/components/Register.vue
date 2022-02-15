<template>
    <div class=".container">
        <div class="row">
            <h1 style="text-align: center">PictureDepot</h1>
            <h3 style="text-align: center">注册</h3>
        </div>
        <div class="row" >
            <div class="col-sm-4 col-sm-offset-4">
                <form role="form" action=" ===???===" method="post">
                    <label for="username">用户名</label>
                    <div class="form-group">
                        <input type="text" name="username" class="form-control" id="username">
                    </div>
                    <label for="password">密码</label>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control" id="password">
                    </div>
                    <label for="confirm password">确认密码</label>
                    <div class="form-group">
                        <input type="password" name="password2" class="form-control" id="confirm password">
                    </div>
                    <div class="alert alert-danger"></div>
                    <button type="submit" class="btn btn-default center-block" style="width: 100%">注册</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register'
}
</script>

<style>

</style>