<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('generations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // user_stories, acceptance_criteria, database_schema, api_spec, sprint_plan
            $table->string('title');
            $table->longText('markdown')->nullable();
            $table->json('json_content')->nullable();
            $table->string('status')->default('completed'); // pending, generating, completed, failed
            $table->text('error_message')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('generations');
    }
};
