<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $project_id
 * @property int $version
 * @property string|null $markdown
 * @property array|null $json_content
 * @property string|null $title
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Prd extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'version',
        'markdown',
        'json_content',
        'title',
    ];

    protected function casts(): array
    {
        return [
            'json_content' => 'array',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function exports(): HasMany
    {
        return $this->hasMany(Export::class);
    }
}
